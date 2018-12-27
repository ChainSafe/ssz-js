//Simple Serialize (SSZ) JS
//Copyright (C) 2018 ChainSafe Systems

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

class ActiveState {
    static get fields(){
        return {
            'pendingAttestations': [AttestationRecord],
            'recentBlockHashes': ['hash32']

        };
    }

    constructor(){
        this.pendingAttestations = [];
        this.recentBlockHashes = [];
    }
}

class AttestationRecord {
    static get fields(){
        return {
            'slotId': 'int32',
            'shardId': 'int32',
            'attesterBitfield': 'bytes'
        }
    }

    constructor(slotId, shardId, attesterBitfield) {
        this.slotId = slotId || 0;
        this.shardId = shardId || 0;
        this.attesterBitfield = attesterBitfield || Buffer.from([]);
    }
}

exports.ActiveState = ActiveState;
exports.AttestationRecord = AttestationRecord;
