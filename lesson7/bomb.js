
var LivingCreature = require("./LivingCreature")
module.exports =  class Bomb extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.directions = [];

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
        return    super.chooseCell(character)
        
    }

    mul() {
        let emptyCellss = this.chooseCell(0)
        var newCell = emptyCellss[Math.floor(Math.random() * emptyCellss.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            let newGr = new Bomb(newX, newY)
            BombArr.push(newGr)
            this.energy = 10
        }
    //     if (weath == "winter") {
    //         this.energy -= 5;
    //         this.multiply -= 5;
    //     }
    //     if (weath == "spring") {
    //         this.energy += 3;
    //         this.multiply += 3;
    //     }
    //     if (weath == "summer") {
    //         this.energy += 2;
    //         this.multiply += 2;
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
        let emptyCellss = this.chooseCell(2)
        var newCell = emptyCellss[Math.floor(Math.random() * emptyCellss.length)]
        let emptyCellss1 = this.chooseCell(3)
        var newCell = emptyCellss1[Math.floor(Math.random() * emptyCellss.length)]
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
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}
