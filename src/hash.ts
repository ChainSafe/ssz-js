/** @module ssz */
import { sha256 } from "js-sha256";
import farmhash from "farmhash";

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
    const cacheInput = farmhash.hash32(input);
    const cached = cache.get(cacheInput);
    if (cached) {
      return cached;
    }
    const result = _hash(input);
    cache.set(cacheInput, result);
    return result;
  } else {
    return _hash(input);
  }
}
