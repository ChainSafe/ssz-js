// Simple Serialize (SSZ) JS
// Copyright (C) 2018 ChainSafe Systems

 // This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const BN = require('bn.js')

function intByteLength (type) {
  let intSize = parseInt(type.match(/\d+/g))
  return intSize / 8
}

function readIntBytes (type) {
  let intSize = parseInt(type.match(/\d+/g))
  let byteSize = intSize / 8

  return (buffer, offset) => {
    let bnResult = new BN([...buffer.slice(offset, (offset + byteSize))], 16, 'be').fromTwos(intSize)
    return intSize <= 32 ? bnResult.toNumber() : bnResult
  }
}

function writeIntBytes (type) {
  let intSize = parseInt(type.match(/\d+/g))
  let byteSize = intSize / 8
  return (buffer, value) => { new BN(value).toTwos(intSize).toBuffer('be', byteSize).copy(buffer) }
}

exports.intByteLength = intByteLength
exports.readIntBytes = readIntBytes
exports.writeIntBytes = writeIntBytes
