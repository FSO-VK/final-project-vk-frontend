/** @fileoverview A small module with common asserts */

/** assertIfError asserts if passed value is an error */
export function assertIfError(potentialError: unknown) {
  if (!(potentialError instanceof Error)) throw new Error('potentialError is not an Error');
}
