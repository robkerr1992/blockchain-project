class Blockchain {
    constructor () {
        this.blocks = [];
    }
    
    addBlock(block) {
        this.blocks.push(block);
    }

    blockHeight() {
        return this.blocks.length;
    }

    prevHash() {
        if (this.blockHeight()) {
            return this.blocks[this.blockHeight() -1].hash();
        }

        return '0x' + ('0').repeat(64);
    }
}

module.exports = Blockchain;