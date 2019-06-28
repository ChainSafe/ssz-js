/** @module ssz */
// @ts-ignore
import sha256 from "bcrypto/lib/sha256";

/**
 * Hash used for hashTreeRoot
 */
export function hash(...inputs: Buffer[]): Buffer {
  return inputs.reduce((acc, i) => acc.update(i), sha256.ctx.init()).final();
}
