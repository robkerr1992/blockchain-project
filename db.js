const { PUB_KEY_X, PUB_KEY_Y } = require('./config');
const Blockchain =  require('./models/Blockchain');
const Utxo = require('./models/Utxo');

module.exports = db = {
    blockchain: new Blockchain,
    utxos: [
        new Utxo(PUB_KEY_X, PUB_KEY_Y, 100)
    ],
    mempool: [],
}