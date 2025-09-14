import {
  Contract,
  rpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  type xdr,
} from "@stellar/stellar-sdk";
import { userSignTransaction } from "./wallet-utils";
import type { ContractResult } from "@/types";

const rpcUrl: string = process.env.NEXT_PUBLIC_STELLAR_RPC_URL as string;
if (!rpcUrl) {
  throw new Error("Missing required env: NEXT_PUBLIC_STELLAR_RPC_URL");
}

const contractAddress: string = process.env
  .NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT as string;
if (!contractAddress) {
  throw new Error("Missing required env: NEXT_PUBLIC_USER_MANAGEMENT_CONTRACT");
}

const params = {
  fee: BASE_FEE,
  networkPassphrase: Networks.TESTNET,
};

export async function contractInt(
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
