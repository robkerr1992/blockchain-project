const jayson = require('jayson');
const { startMining, stopMining } = require('./mine');
const { utxos } =  require('./db');
const elliptic = require('elliptic').ec;
const ec = new elliptic('secp256k1');
const sha256 = require('crypto-js/sha256');


const { PORT } = require('./config');
const Transaction = require('./models/Transaction');
const Utxo = require('./models/Utxo');
const db = require('./db');

const server = jayson.server({
    startMining: (_, callback) => {
        startMining();
        callback(null, 'Started mining!');
    }, 

    stopMining: (_, callback) => {
        stopMining();
        callback(null, 'Stopped Mining!');
    },

    getBalance: ([address], callback) => {
        const total = utxos
            .filter((utxo) => utxo.owner === address && ! utxo.spent)
            .reduce((acc, utxo) => acc + utxo.amount, 0);
        
        callback(null, total);
    },

    addTransactionToMempool: ([senderX, senderY, recipientX, recipientY, sigR, sigS, amount], callback) => {
        //get sender public key

        const senderKey = ec.keyFromPublic({
            x: senderX,
            y: senderY
        }, 'hex');


        //verify signature
        if (!senderKey.verify(sha256(amount).toString(),
            {
                r: sigR,
                s: sigS
            }
        )) {
            throw Error('Could not verify signature.');
        }

        //if i had more time this i where i would remove the utxos from
        //the utxo array and then replace them so that they would correctly 
        //display that they were sent 
        //

        //get sender utxos and balance
        const senderUtxos = utxos.filter((utxo) => {
            return utxo.ownerX === senderKey.getPublic().x.toString(16) 
            && utxo.ownerY === senderKey.getPublic().y.toString(16)
            && !utxo.spent
        });

        const senderBalance = senderUtxos.reduce((acc, utxo) => acc + utxo.amount, 0);

        //verify balance
        if (senderBalance < amount) {
            throw Error('Insufficient funds.')
        }

        //gather utxos from sender that are greater than or equal to amount
        const utxosToBeSpent = [];
        let totalBeingSpent = 0;
        while (utxosToBeSpent == [] || totalBeingSpent < amount) {
            let utxo = senderUtxos.shift();
            totalBeingSpent+= utxo.amount;
            utxosToBeSpent.push(utxo);
        }

        //create txo for recipient
        const txos = [new Utxo(recipientX, recipientY, amount)];

        //create txo for sender if there is change
        if (totalBeingSpent > amount) {
            txos.push(new Utxo(
                senderKey.getPublic().x.toString(16),
                senderKey.getPublic().y.toString(16),
                totalBeingSpent - amount
            ));
        }

        //create transaction from inputs and outputs
        const transaction = new Transaction([utxosToBeSpent], [txos]);

        db.mempool.push(transaction);

        console.log(db.mempool);
        console.log(db.utxos);

        callback(null, 'Transaction added to mempool!')
    }
});

server.http().listen(PORT);