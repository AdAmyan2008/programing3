var LivingCreature = require("./LivingCreature")
module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++
        let emptyCellss = this.chooseCell(0)
        var newCell = emptyCellss[Math.floor(Math.random() * emptyCellss.length)]
        if (this.multiply >= 8 && newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 1
            let newGr = new Grass(newX, newY)
            grassArr.push(newGr)
            this.multiply = 0
        }
       
    }

}

