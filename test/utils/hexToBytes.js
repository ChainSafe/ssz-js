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

    /**
     * Convert a hex string to a byte array
     *
     * @method hexToBytes
     * @param {string} hex
     * @return {Buffer} the byte buffer
     */
    function hexToBytes(hex) {
        hex = hex.toString(16);

        hex = hex.replace(/^0x/i,'');

        let bytes = new Uint8Array(hex.length/2);
        for (var i = 0, c = 0; c < hex.length; c += 2, i += 1){
            bytes[i] = parseInt(hex.substr(c, 2), 16);
        }
        return Buffer.from(bytes.buffer);
    };

    exports.hexToBytes = hexToBytes;
