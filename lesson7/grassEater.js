var LivingCreature = require("./LivingCreature")
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 13
       

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return  super.chooseCell(character)
       
    }

    mul() {
        let emptyCellss = this.chooseCell(0)
        var newCell = emptyCellss[Math.floor(Math.random() * emptyCellss.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2
            let newGr = new GrassEater(newX, newY)
            grassEaterArr.push(newGr)
            this.energy = 10
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

    move() {
        this.energy--
        let emptyCellss = this.chooseCell(0)
        var newCell = emptyCellss[Math.floor(Math.random() * emptyCellss.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        let emptyCellss = this.chooseCell(1)
        var newCell = emptyCellss[Math.floor(Math.random() * emptyCellss.length)]
        let emptyCellss1 = this.chooseCell(6)
        var newCell1 = emptyCellss1[Math.floor(Math.random() * emptyCellss.length)]
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 15) {
                this.mul()
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
         } else if (newCell1){
        this.die()

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
