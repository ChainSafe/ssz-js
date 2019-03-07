import { assert } from "chai";

import BN from "bn.js";

import {
  SerializableType,
  SerializableValue,
} from "../src/types";

import { deserialize } from "../src/deserialize";

import {
  ArrayObject,
  OuterObject,
  SimpleObject,
} from "./objects";

import { stringifyType } from "./utils";

describe("deserialize", () => {
  const testCases: {
    value: string;
    type: SerializableType;
    expected: SerializableValue;
  }[] = [
    {value: "01", type: "bool", expected: true},
    {value: "00", type: "bool", expected: false},
    {value: "00", type: "uint8", expected: 0},
    {value: "01", type: "uint8", expected: 1},
    {value: "ff", type: "uint8", expected: 255},
    {value: "0001", type: "uint16", expected: 2**8},
    {value: "ff0f", type: "uint16", expected: 2**12-1},
    {value: "0010", type: "uint16", expected: 2**12},
    {value: "ffff", type: "uint16", expected: 2**16-1},
    {value: "00000100", type: "uint32", expected: 2**16},
    {value: "ffffff0f", type: "uint32", expected: 2**28-1},
    {value: "00000010", type: "uint32", expected: 2**28},
    {value: "ffffffff", type: "uint32", expected: 2**32-1},
    {value: "0000000001000000", type: "uint64", expected: new BN(2**32)},
    {value: "ffffffffffff0f00", type: "uint64", expected: new BN(2**52-1)},
    {value: "0100000000000000", type: "uint64", expected: new BN("01", 16)},
    {value: "0000000000000010", type: "uint64", expected: new BN("1000000000000000", 16)},
    {value: "ffffffffffffffff", type: "uint64", expected: new BN("ffffffffffffffff", 16)},
    {value: "ffffffffffffffffffffffffffffffff", type: "uint128", expected: new BN("ffffffffffffffffffffffffffffffff", 16)},
    {value: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", type: "uint256", expected: new BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16)},
    {value: "0000000001000000", type: "number64", expected: 2**32},
    {value: "ffffffffffff0f00", type: "number64", expected: 2**52-1},
    {value: "04000000deadbeef", type: "bytes8", expected: Buffer.from("deadbeef", "hex")},
    {value: "10000000deadbeefdeadbeefdeadbeefdeadbeef", type: "bytes32", expected: Buffer.from("deadbeefdeadbeefdeadbeefdeadbeef", "hex")},
    {value: "04000000deadbeef", type: "bytes", expected: Buffer.from("deadbeef", "hex")},
    {value: "04000000deadbeef", type: ["byte",8],  expected: Buffer.from("deadbeef", "hex")},
    {value: "10000000deadbeefdeadbeefdeadbeefdeadbeef", type: ["byte",32],  expected: Buffer.from("deadbeefdeadbeefdeadbeefdeadbeef", "hex")},
    {value: "04000000deadbeef", type: ["byte"], expected: Buffer.from("deadbeef", "hex")},
    {value: "03000000000000", type: SimpleObject, expected: {b:0,a:0}},
    {value: "03000000020001", type: SimpleObject, expected: {b:2,a:1}},
    {value: "0700000003020000000600", type: OuterObject, expected: {v:3, subV:{v:6}}},
    {value: "120000000e0000000300000002000103000000040003", type: ArrayObject, expected: {v: [{b:2,a:1}, {b:4,a:3}]}},
    {value: "1600000007000000030200000006000700000005020000000700", type: [OuterObject], expected: [{v:3, subV:{v:6}}, {v:5, subV:{v:7}}]},
  ];
  for (const {value, type, expected} of testCases) {
    it(`should correctly deserialize ${stringifyType(type)}`, () => {
      const actual = deserialize(Buffer.from(value, "hex"), type);
      if (BN.isBN(expected)) {
        assert(expected.eq(actual as BN), `actual: ${actual}, expected: ${expected}`);
      } else {
        assert.deepEqual(actual, expected);
      }
    });
  }

  const failCases: {
    value: string;
    type: SerializableType;
    reason: string;
  }[] = [
    {value: "01", type: "foo", reason: "Invalid type"},
    {value: "01", type: "bar", reason: "Invalid type"},
  ];
  for (const {value, type, reason} of failCases) {
    it(`should throw an error for ${stringifyType(type)}: ${reason}`, () => {
      assert.throws(() => deserialize(Buffer.from(value, "hex"), type));
    });
  }
});