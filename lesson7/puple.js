var LivingCreature = require("./LivingCreature")
module.exports =  class Puple extends LivingCreature {
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
        return   super.chooseCell(character)
        
    }

    mul() {
        let emptyCellss = this.chooseCell(0)
        var newCell = emptyCellss[Math.floor(Math.random() * emptyCellss.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 4
            let newGr = new Puple(newX, newY)
            pupleArr.push(newGr)
            this.energy = 20
        }
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
            matrix[newY][newX] = matrix[this.y][this.x]
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

            } else if (newCell) {
                this.energy++
                let newX = newCell1[0]
                let newY = newCell1[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX
                this.y = newY
                if (this.energy >= 15) {
                    this.mul()
                }
                for (var i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                    
                
                    break;
                    }
                }
    
                } else {
                this.move()
            }
        }

        die() {
            matrix[this.y][this.x] = 0
            for (var i in pupleArr) {
                if (this.x == pupleArr[i].x && this.y == pupleArr[i].y) {
                    pupleArr.splice(i, 1);
                    break;
                }
            }
        }
    }
