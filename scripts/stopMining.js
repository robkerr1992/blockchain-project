const jayson = require('jayson');
const { PORT } = require('../config');


const client = jayson.client.http({
    port: PORT
});

client.request('stopMining', [], (err, res) => {
    if (err) throw err;
    console.log(res.result);
})

