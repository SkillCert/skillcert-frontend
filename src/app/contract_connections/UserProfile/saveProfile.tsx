import { Contract, TransactionBuilder, BASE_FEE, xdr, Address, Transaction } from '@stellar/stellar-sdk';
import { Api, assembleTransaction, Server } from '@stellar/stellar-sdk/rpc'


export interface UserProfileData {
  name: string;
  email: string;
  profession?: string;
  goals?: string;
  country: string;
}

export interface SaveProfileResponse {
  success: boolean;
  transactionHash?: string;
  error?: string;
  profile?: UserProfileData & { user: string };
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  country?: string;
  general?: string;
}

export interface ContractConfig {
  contractAddress: string;
  networkPassphrase: string;
  rpcUrl: string;
}

// Validate user profile data
export function validateProfileData(profileData: UserProfileData): ValidationErrors | null {
  const errors: ValidationErrors = {};

  if (!profileData.name || profileData.name.trim().length === 0) {
    errors.name = 'Name is required and cannot be empty';
  }

  if (!profileData.email || profileData.email.trim().length === 0) {
    errors.email = 'Email is required and cannot be empty';
  } else if (!isValidEmail(profileData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!profileData.country || profileData.country.trim().length === 0) {
    errors.country = 'Country is required and cannot be empty';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/// Get wallet address from the connected wallet
async function getWalletAddress(): Promise<string> {
  // This will depend on wallet integration (Freighter, etc.)
  // Example for Freighter wallet:
  if (typeof window !== 'undefined' && (window as unknown as { freighter?: unknown }).freighter) {
    try {
      const { address } = await ((window as unknown as { freighter: { getAddress: () => Promise<{ address: string }> } }).freighter.getAddress());
      return address;
    } catch {
      throw new Error('Failed to get wallet address. Please connect your wallet.');
    }
  }
  
  throw new Error('No wallet detected. Please install and connect a Stellar wallet.');
}

async function signAndSubmitTransaction(
  transaction: unknown,
  config: ContractConfig
): Promise<string> {
  if (typeof window !== 'undefined' && (window as unknown as { freighter?: unknown }).freighter) {
    try {
      const signedTransaction = await ((window as unknown as { freighter: { signTransaction: (xdr: string, passphrase: string) => Promise<string> } }).freighter.signTransaction(
        (transaction as { toXDR: () => string }).toXDR(),
        config.networkPassphrase
      ));

      const server = new Server(config.rpcUrl);
      const result = await server.sendTransaction(signedTransaction as unknown as Transaction);
      
      if (result.status === 'PENDING') {
        // Wait for transaction confirmation
        let getResponse = await server.getTransaction(result.hash);
        while (getResponse.status === 'NOT_FOUND') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          getResponse = await server.getTransaction(result.hash);
        }
        
        if (getResponse.status === 'SUCCESS') {
          return result.hash;
        } else {
          throw new Error(`Transaction failed: ${getResponse.status}`);
        }
      } else {
        throw new Error(`Transaction submission failed: ${result.status}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to sign or submit transaction: ${errorMessage}`);
    }
  }
  
  throw new Error('Wallet not available for signing');
}

// Save user profile data on the blockchain
export async function saveProfile(
  profileData: UserProfileData,
  config: ContractConfig
): Promise<SaveProfileResponse> {
  try {
    const validationErrors = validateProfileData(profileData);
    if (validationErrors) {
      return {
        success: false,
        error: `Validation failed: ${Object.values(validationErrors).join(', ')}`
      };
    }

    const walletAddress = await getWalletAddress();

    const server = new Server(config.rpcUrl);
    const contract = new Contract(config.contractAddress);

    const account = await server.getAccount(walletAddress);

     const createOptionString = (value: string | undefined): xdr.ScVal => {
      if (value && value.trim().length > 0) {
        // Some(value) - represented as a vector with one element
        return xdr.ScVal.scvVec([xdr.ScVal.scvString(value)]);
      } else {
        // None - represented as an empty vector
        return xdr.ScVal.scvVec([]);
      }
    };

    const contractArgs = [
      xdr.ScVal.scvString(profileData.name),
      xdr.ScVal.scvString(profileData.email),
      createOptionString(profileData.profession),
      createOptionString(profileData.goals),
      xdr.ScVal.scvString(profileData.country),
      xdr.ScVal.scvAddress(new Address(walletAddress).toScAddress())
    ];

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: config.networkPassphrase,
    })
      .addOperation(
        contract.call(
          'user_management_save_profile',
          ...contractArgs
        )
      )
      .setTimeout(30)
      .build();

    // Simulate transaction first
    const simulateResponse = await server.simulateTransaction(transaction);
    if (Api.isSimulationError(simulateResponse)) {
      throw new Error(`Simulation failed: ${simulateResponse.error}`);
    }

    const preparedTransaction = assembleTransaction(transaction, simulateResponse);

    const transactionHash = await signAndSubmitTransaction(preparedTransaction, config);

    return {
      success: true,
      transactionHash,
      profile: {
        ...profileData,
        user: walletAddress
      }
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('Name cannot be empty')) {
      return {
        success: false,
        error: 'Name is required and cannot be empty'
      };
    } else if (errorMessage.includes('Email cannot be empty')) {
      return {
        success: false,
        error: 'Email is required and cannot be empty'
      };
    } else if (errorMessage.includes('Country cannot be empty')) {
      return {
        success: false,
        error: 'Country is required and cannot be empty'
      };
    } else if (errorMessage.includes('wallet')) {
      return {
        success: false,
        error: 'Wallet connection required. Please connect your wallet and try again.'
      };
    }

    return {
      success: false,
      error: errorMessage || 'An unexpected error occurred while saving profile'
    };
  }
}