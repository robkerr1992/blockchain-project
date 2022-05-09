const jayson = require('jayson');
const { PORT } = require('../config');


const client = jayson.client.http({
    port: PORT
});

client.request('startMining', [], (err, res) => {
    if (err) throw err;
    console.log(res.result);
})

