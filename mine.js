const Block = require('./models/Block');
const db = require('./db');
const Transaction = require('./models/Transaction');
const Utxo = require('./models/Utxo');
const targetDifficulty = '0x00'+ ('F').repeat(62);
const { PUB_KEY_X, PUB_KEY_Y } = require('./config');

let mining = true;

const startMining = () => {
    mining = true;
    mine();
}

const stopMining = () => {
    mining = false;
}

const mine = () => {
    if (!mining) {
        return;
    }

    if (!db.mempool.length) {
        console.log('No Transactions Yet!');
        setTimeout(mine, 3000);
        return;
    }

    const transactions = [
        ...db.mempool.splice(0, 5),
        new Transaction([], [new Utxo(PUB_KEY_X, PUB_KEY_Y, 6.25)])
    ];

    const block = new Block(db.blockchain.prevHash(), transactions);

    while (BigInt('0x' + block.hash()) >= targetDifficulty) {
        block.nonce++;
    }

    block.execute();

    db.blockchain.addBlock(block);

    console.log(`Mined block #${db.blockchain.blockHeight()} with hash ${block.hash()}`);
    console.log(`Prev Hash: ${block.prevHash}`);

    setTimeout(mine, 3000);
}

mine();

module.exports = {
    startMining,
    stopMining
};