/** @module ssz */
import { Sha256 } from "sha256-rust-wasm";

/**
 * Hash used for hashTreeRoot
 */
export function hash(...inputs: Buffer[]): Buffer {
  //this will share memory instead of allocating new buffer
  //https://nodejs.org/api/buffer.html#buffer_buffers_and_typedarray
  return Buffer.from(inputs.reduce((acc, i) => acc.update(i), Sha256.create()).final().buffer);
}
