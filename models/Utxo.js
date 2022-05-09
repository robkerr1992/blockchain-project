class Utxo {
    constructor (ownerX, ownerY, amount) {
        this.ownerX = ownerX;
        this.ownerY = ownerY;
        this.amount = amount;
        this.spent = false;
    }
}

module.exports = Utxo;