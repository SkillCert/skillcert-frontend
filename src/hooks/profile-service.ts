import { nativeToScVal, type xdr } from "@stellar/stellar-sdk";
import { contractInt } from "./contract-service";
import { getUserAddress } from "./wallet-utils";
import {
  stringToScVal,
  arrayToScVal,
  parseCommaSeparatedString,
} from "./stellar-utils";
import type { ProfileData, ContractResult } from "@/types";

export async function saveProfile(
  profileData: ProfileData
): Promise<ContractResult> {
  const caller = await getUserAddress();

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
  const languagesArray: string[] = parseCommaSeparatedString(languages);
  const categoriesArray: string[] =
    parseCommaSeparatedString(teachingCategories);

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
