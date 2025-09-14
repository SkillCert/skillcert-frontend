"use client";

import { useState } from "react";
import {
  Contract,
  rpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  type xdr,
} from "@stellar/stellar-sdk";
import {
  requestAccess,
  signTransaction,
  setAllowed,
  getAddress,
} from "@stellar/freighter-api";

interface ContractData {
  contractId: string;
  studentId: string;
  teacherId: string;
  courseId: string;
  amount: string;
  terms: string;
}

interface FreighterResponse {
  error?: string;
}

interface AddressResponse extends FreighterResponse {
  address: string;
}

interface AllowedResponse extends FreighterResponse {
  isAllowed: boolean;
}

interface SignTransactionResponse extends FreighterResponse {
  signedTxXdr: string;
  signerAddress: string;
}

interface ContractResult {
  success: boolean;
  result?: any;
  hash: string;
}

interface UseSignContractReturn {
  signContract: (contractData: ContractData) => Promise<ContractResult | null>;
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
  .NEXT_PUBLIC_CONTRACT_MANAGEMENT_CONTRACT as string;
if (!contractAddress) {
  throw new Error("Missing required env: NEXT_PUBLIC_CONTRACT_MANAGEMENT_CONTRACT");
}

async function checkConnection(): Promise<boolean> {
  try {
    const result: AllowedResponse = await setAllowed();
    if (result.error) {
      return false;
    }
    return result.isAllowed;
  } catch {
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

async function signContract(contractData: ContractData): Promise<ContractResult> {
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
    contractId,
    studentId,
    teacherId,
    courseId,
    amount,
    terms,
  } = contractData;

  const values: xdr.ScVal[] = [
    stringToScVal(contractId),
    stringToScVal(studentId),
    stringToScVal(teacherId),
    stringToScVal(courseId),
    stringToScVal(amount),
    stringToScVal(terms),
    nativeToScVal(caller, { type: "address" }),
  ];

  const result = await contractInt(caller, "sign_contract", values);
  return result;
}

export function useSignContract(): UseSignContractReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSignContract = async (
    contractData: ContractData
  ): Promise<ContractResult | null> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setTransactionHash(null);

    try {
      const result = await signContract(contractData);

      if (result && result.success) {
        setSuccess(true);
        setTransactionHash(result.hash);
        return result;
      } else {
        throw new Error("Failed to sign contract on blockchain");
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
    signContract: handleSignContract,
    isLoading,
    error,
    success,
    transactionHash,
    checkConnection,
    retrievePublicKey,
  };
}