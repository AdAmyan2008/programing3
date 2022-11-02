var LivingCreature = require("./LivingCreature")
module.exports = class Virus  extends LivingCreature{
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
            let newVirus = new Virus(newX, newY)
            virusArr.push(newVirus)
            this.multiply = 0
        }
    //     if (weath == "winter") {
    //         this.energy -= 2;
    //         this.multiply -= 2;
    //     }
    //     if (weath == "spring") {
    //         this.energy += 5;
    //         this.multiply += 5;
    //     }
    //     if (weath == "summer") {
    //         this.energy += 3;
    //         this.multiply += 3;
    //     }
    //     if (weath == "autumn") {
    //         this.energy--;
    //         this.multiply--;
    // }
    }

}
