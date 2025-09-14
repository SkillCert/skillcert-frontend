import {
  requestAccess,
  signTransaction,
  setAllowed,
  getAddress,
} from "@stellar/freighter-api";
import type {
  AddressResponse,
  AllowedResponse,
  SignTransactionResponse,
} from "@/types";

export async function checkConnection(): Promise<boolean> {
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

export async function retrievePublicKey(): Promise<string> {
  try {
    const result: AddressResponse = await requestAccess();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.address;
  } catch (e) {
    throw e;
  }
}

export async function getUserAddress(): Promise<string> {
  try {
    const addressResult: AddressResponse = await getAddress();
    if (addressResult.error) {
      const accessResult: AddressResponse = await requestAccess();
      if (accessResult.error) {
        throw new Error(accessResult.error);
      }
      return accessResult.address;
    }
    return addressResult.address;
  } catch (error) {
    throw new Error(`Failed to get user address: ${error}`);
  }
}

export async function userSignTransaction(
  xdrString: string,
  networkPassphrase: string,
  signWith: string
): Promise<string> {
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
}
