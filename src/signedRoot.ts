import assert from "assert";

import {
  ObjectType,
  SerializableObject,
} from "./types";

import { hashTreeRoot } from "./hashTreeRoot";

import {
  copyType,
  isObjectType,
} from "./util/types";

/**
 * Merkleize an SSZ object w/o its last field
 * Used for signing/verifying signed data
 * @method signedRoot
 * @param {SerializableObject} value
 * @param {ObjectType} type
 * @returns {Buffer}
 */
export function signedRoot(value: SerializableObject, type: ObjectType): Buffer {
  assert(isObjectType(type));
  const truncatedType = copyType(type) as ObjectType;
  truncatedType.fields.pop();
  return hashTreeRoot(value, type);
}