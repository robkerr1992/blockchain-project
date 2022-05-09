const sha256 = require('crypto-js/sha256');

class Block {
    constructor (prevHash, transactions) {
        this.prevHash = prevHash;
        this.transactions = transactions;
        this.timestamp = Date.now();
        this.nonce = 0;
    }

    hash() {
        return sha256(`${this.timestamp}${this.nonce}${JSON.stringify(this.transactions)}`).toString();
    }

    execute() {
        this.transactions.forEach((tx) => tx.execute());
    }
}

module.exports = Block;