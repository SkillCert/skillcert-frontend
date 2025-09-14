// Hooks
export { useSaveProfile } from "./use-save-profile";
export { useWallet } from "./use-wallet";

// Services
export { saveProfile } from "./profile-service";
export { contractInt } from "./contract-service";

// Utilities
export {
  checkConnection,
  retrievePublicKey,
  getUserAddress,
  userSignTransaction,
} from "./wallet-utils";
export {
  stringToScVal,
  arrayToScVal,
  parseCommaSeparatedString,
} from "./stellar-utils";

// Types
export type {
  ProfileData,
  FreighterResponse,
  AddressResponse,
  AllowedResponse,
  SignTransactionResponse,
  ContractResult,
  UseSaveProfileReturn,
  UseWalletReturn,
} from "@/types";
