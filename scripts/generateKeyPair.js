const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');
const key =  ec.genKeyPair();

console.log({
    privateKey: key.getPrivate().toString(16),
    publicX: key.getPublic().x.toString(16),
    publicY: key.getPublic().y.toString(16),
})