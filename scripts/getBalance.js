const jayson = require('jayson');
const { PORT } = require('../config');
const { argv } = require('yargs');
const { address } = argv;


const client = jayson.client.http({
    port: PORT
});

console.log(address);

client.request('getBalance', [address], (err, res) => {
    console.log(address);
    if (err) throw err;
    console.log(res.result);
})