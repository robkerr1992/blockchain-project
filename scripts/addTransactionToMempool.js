const jayson = require('jayson');
const { PORT } = require('../config');
const { argv } = require('yargs');
const { senderX, senderY, recipientX, recipientY, sigR, sigS, amount } = argv;

console.log(senderX, senderY, sigR, sigS, amount);

const client = jayson.client.http({
    port: PORT
});

client.request('addTransactionToMempool', [senderX, senderY, recipientX, recipientY, sigR, sigS, amount], (err, res) => {
    if (err) throw err;
    console.log(res.result);
})