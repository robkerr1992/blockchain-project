const {utxos} = require('../db');

class Transaction {
    constructor (utxos, txos) {
        this.utxos = utxos;
        this.txos = txos;
    }

    execute() {
        this.utxos.forEach((utxo) => {
            utxo.spent = true;
        });
        this.txos.forEach((txo) => {
            utxos.push(txo)
        });
    }
}

module.exports = Transaction;