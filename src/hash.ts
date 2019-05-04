/** @module ssz */
import { sha256 } from "js-sha256";
import { cache } from "./cache";

/** @ignore */
function _hash(input: Buffer): Buffer {
  return Buffer.from(sha256.update(input).arrayBuffer());
}

/**
 * Hash used for hashTreeRoot
 */
export function hash(input: Buffer): Buffer {
  if (cache) {
    const hexInput = input.toString('hex');
    const cached = cache.get(hexInput);
    if (cached) {
      return cached;
    }
    const result = _hash(input);
    cache.set(hexInput, result);
    return result;
  } else {
    return _hash(input);
  }
}
