const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');
const {PRI_KEY} = require('../config');
const key = ec.keyFromPrivate(PRI_KEY);
const sha256 = require('crypto-js/sha256');

const message = 10;
const messageHash = sha256(message);

const signature = key.sign(messageHash.toString());

console.log({
  message,
  signature: {
    r: signature.r.toString(16),
    s: signature.s.toString(16)
  }
});