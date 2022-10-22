var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs");
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, () => {
    console.log("server run");
})


function matrixGenerate(matLen, gr, grEat, pr, puple, bomb) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix.push([])
        for (let j = 0; j < matLen; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2

        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3

        }
    }
    for (let i = 0; i < puple; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4

        }
    }
    for (let i = 0; i < puple; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5

        }
    }
    return matrix
}

matrix = matrixGenerate(40, 35, 37, 45, 36, 30)

grassArr = []
grassEaterArr = []
predatorArr = []
pupleArr = []
bombArr = []


Grass = require("./grass");
GrassEater = require("./grassEater");
Predator = require("./predator");
Puple = require("./puple");
Bomb = require("./bomb");


function createObject() {



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Puple(x, y)
                pupleArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Bomb(x, y)
                bombArr.push(gr)
            }
        }
    }
}


function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat()
    }
    for (let i = 0; i < pupleArr.length; i++) {
        pupleArr[i].eat()
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].eat()
    }

    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 200)


io.on('connection', () => {
    createObject(matrix);
  });

  var statistics = {};

