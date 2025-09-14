import { nativeToScVal, type xdr } from "@stellar/stellar-sdk";

export function stringToScVal(value: string): xdr.ScVal {
  return nativeToScVal(value, { type: "string" });
}

export function arrayToScVal(array: string[]): xdr.ScVal {
  return nativeToScVal(
    array.map((item) => nativeToScVal(item, { type: "string" })),
    { type: "vec" }
  );
}

export function parseCommaSeparatedString(value: string): string[] {
  return value
    .split(",")
    .map((item: string) => item.trim())
    .filter((item: string) => item);
}
