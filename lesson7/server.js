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


function matrixGenerate(matLen, gr, grEat, pr, puple, bomb, virus) {
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
    for (let i = 0; i < bomb; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5

        }
    }
    for (let i = 0; i < virus; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6

        }
    }
    return matrix
}

matrix = matrixGenerate(40, 35, 37, 45, 36, 30, 20)

io.sockets.emit('send matrix', matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
pupleArr = []
bombArr = []
virusArr = []


weath = "winter";
Grass = require("./grass");
GrassEater = require("./grassEater");
Predator = require("./predator");
Puple = require("./puple");
Bomb = require("./bomb");
Virus = require("./virus");


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
            }else if (matrix[y][x] == 6) {
                let gr = new Virus(x, y)
                virusArr.push(gr)
            }
        }
    }
    io.sockets.emit('send matrix', matrix)

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
    for (let i = 0; i < virusArr.length; i++) {
        virusArr[i].mul()
    }

    io.sockets.emit('send matrix', matrix)
}

setInterval(game, 200)

var weath;

function Winter() {
    weath = "winter";
    io.sockets.emit('Winter', weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit('Summer', weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit('Spring', weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit('Autumn', weath);
}

function kill() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    pupleArr = []
    bombArr = []
    virusArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrass() {
    for (var i = 0; i < 2; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 6; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPuple() {
    for (var i = 0; i < 3; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            pupleArr.push(new Puple(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addBomb() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            bombArr.push(new Bomb(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addVirus() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            virusArr.push(new Virus(x, y, 6))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
});


io.on('connection', (socket) => {
    createObject(matrix);
    socket.on("spring", Spring);
    socket.on("summer", Summer);
    socket.on("autumn", Autumn);
    socket.on("winter", Winter);
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add puple", addPuple);
    socket.on("add bomb", addBomb);
    socket.on("add virus", addVirus);
  });

  var statistics = {};

setInterval(() => {
statistics.grass = grassArr.length
statistics.grassEater = grassEaterArr.length
statistics.predator = predatorArr.length
statistics.puple = pupleArr.length
statistics.bomb = bombArr.length
statistics.virus = virusArr.length


 fs.writeFile("statistic.json",JSON.stringify(statistics),function() {
 console.log("send")
})

},1000);


