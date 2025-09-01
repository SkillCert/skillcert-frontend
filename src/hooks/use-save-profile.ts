"use client";

import { useState } from "react";
import {
  Contract,
  rpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  Address,
  type xdr,
} from "@stellar/stellar-sdk";
import {
  requestAccess,
  signTransaction,
  setAllowed,
  getAddress,
} from "@stellar/freighter-api";

/**
 * Custom React hook for managing teacher profile registration on the Stellar blockchain.
 *
 * Provides a complete interface for saving teacher profile data to a Soroban smart contract,
 * including wallet connection management, transaction signing via Freighter wallet, and
 * comprehensive state management for loading, error, and success states.
 *
 * @returns {UseSaveProfileReturn} Hook interface with saveProfile function and state management
 */

interface ProfileData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialization: string;
  languages: string;
  teachingCategories: string;
}

interface FreighterResponse<T> {
  error?: string;
}

interface AddressResponse extends FreighterResponse<string> {
  address: string;
}

interface AllowedResponse extends FreighterResponse<boolean> {
  isAllowed: boolean;
}

interface SignTransactionResponse extends FreighterResponse<string> {
  signedTxXdr: string;
  signerAddress: string;
}

interface ContractResult {
  success: boolean;
  result?: any;
  hash: string;
}

interface UseSaveProfileReturn {
  saveProfile: (profileData: ProfileData) => Promise<ContractResult | null>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  transactionHash: string | null;
  checkConnection: () => Promise<boolean>;
  retrievePublicKey: () => Promise<string>;
}

const rpcUrl: string = process.env.NEXT_PUBLIC_STELLAR_RPC_URL as string;
if (!rpcUrl) {
  throw new Error("Missing required env: NEXT_PUBLIC_STELLAR_RPC_URL");
}
const contractAddress: string = process.env
  .NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT as string;
if (!contractAddress) {
  throw new Error("Missing required env: NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT");
}

async function checkConnection(): Promise<boolean> {
  try {
    const result: AllowedResponse = await setAllowed();
    if (result.error) {
      return false;
    }
    return result.isAllowed;
  } catch (error) {
    return false;
  }
}

const retrievePublicKey = async (): Promise<string> => {
  try {
    const result: AddressResponse = await requestAccess();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.address;
  } catch (e) {
    throw e;
  }
};

const userSignTransaction = async (
  xdrString: string,
  networkPassphrase: string,
  signWith: string
): Promise<string> => {
  try {
    const result: SignTransactionResponse = await signTransaction(xdrString, {
      networkPassphrase,
      address: signWith,
    });
    if (result.error) {
      throw new Error(result.error);
    }
    return result.signedTxXdr;
  } catch (e) {
    throw e;
  }
};

const stringToScVal = (value: string): xdr.ScVal => {
  return nativeToScVal(value, { type: "string" });
};

const accountToScVal = (account: string): xdr.ScVal =>
  new Address(account).toScVal();

const arrayToScVal = (array: string[]): xdr.ScVal => {
  return nativeToScVal(
    array.map((item) => nativeToScVal(item, { type: "string" })),
    { type: "vec" }
  );
};

const params = {
  fee: BASE_FEE,
  networkPassphrase: Networks.TESTNET,
};

async function contractInt(
  caller: string,
  functName: string,
  values: xdr.ScVal[] | null
): Promise<ContractResult> {
  const provider = new rpc.Server(rpcUrl, { allowHttp: true });
  const contract = new Contract(contractAddress);
  const sourceAccount = await provider.getAccount(caller);

  let buildTx;
  if (values == null) {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName))
      .setTimeout(30)
      .build();
  } else {
    buildTx = new TransactionBuilder(sourceAccount, params)
      .addOperation(contract.call(functName, ...values))
      .setTimeout(30)
      .build();
  }

  const _buildTx = await provider.prepareTransaction(buildTx);
  const prepareTx = _buildTx.toXDR();
  const signedTx = await userSignTransaction(
    prepareTx,
    Networks.TESTNET,
    caller
  );
  const tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);

  try {
    const sendTx = await provider.sendTransaction(tx);

    if (sendTx.errorResult) {
      throw new Error("Unable to submit transaction");
    }

    if (sendTx.status === "PENDING") {
      let txResponse = await provider.getTransaction(sendTx.hash);
      while (txResponse.status === "NOT_FOUND") {
        txResponse = await provider.getTransaction(sendTx.hash);
        await new Promise<void>((resolve) => setTimeout(resolve, 100));
      }

      if (txResponse.status === "SUCCESS") {
        const result = txResponse.returnValue;
        return { success: true, result, hash: sendTx.hash };
      } else {
        throw new Error(`Transaction failed with status: ${txResponse.status}`);
      }
    } else {
      throw new Error(`Unexpected transaction status: ${sendTx.status}`);
    }
  } catch (err) {
    throw err;
  }
}

async function saveProfile(profileData: ProfileData): Promise<ContractResult> {
  let caller: string;

  try {
    const addressResult: AddressResponse = await getAddress();
    if (addressResult.error) {
      const accessResult: AddressResponse = await requestAccess();
      if (accessResult.error) {
        throw new Error(accessResult.error);
      }
      caller = accessResult.address;
    } else {
      caller = addressResult.address;
    }
  } catch (error) {
    throw new Error(`Failed to get user address: ${error}`);
  }

  const {
    name,
    lastname,
    email,
    password,
    confirmPassword,
    specialization,
    languages,
    teachingCategories,
  } = profileData;

  // Parse comma-separated strings into arrays
  const languagesArray: string[] = languages
    .split(",")
    .map((lang: string) => lang.trim())
    .filter((lang: string) => lang);
  const categoriesArray: string[] = teachingCategories
    .split(",")
    .map((cat: string) => cat.trim())
    .filter((cat: string) => cat);

  // Convert to Soroban ScVal format matching contract signature
  const values: xdr.ScVal[] = [
    stringToScVal(name),
    stringToScVal(lastname),
    stringToScVal(email),
    stringToScVal(password),
    stringToScVal(confirmPassword),
    stringToScVal(specialization),
    arrayToScVal(languagesArray),
    arrayToScVal(categoriesArray),
    nativeToScVal(caller, { type: "address" }),
  ];

  const result = await contractInt(caller, "save_profile", values);
  return result;
}

export function useSaveProfile(): UseSaveProfileReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSaveProfile = async (
    profileData: ProfileData
  ): Promise<ContractResult | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setTransactionHash(null);

    try {
      const result = await saveProfile(profileData);

      if (result && result.success) {
        setSuccess(true);
        setTransactionHash(result.hash);
        return result;
      } else {
        throw new Error("Failed to save profile to blockchain");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveProfile: handleSaveProfile,
    isLoading,
    error,
    success,
    transactionHash,
    checkConnection,
    retrievePublicKey,
  };
}
