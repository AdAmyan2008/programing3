var socket = io()
var side = 20;
var weath = "winter"
function setup() {
    createCanvas(25 * side, 25 * side);
    background('#acacac');
}
socket.on("Winter", function (data) {
    weath = data;
})
socket.on("Summer", function (data) {
    weath = data;
})
socket.on("Spring", function (data) {
    weath = data;
})
socket.on("Autumn", function (data) {
    weath = data;
})
 var weath = "spring";
function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 1) {
                if (weath == "spring") {
                    fill("darkgreen");
                }
                else if (weath == "summer") {
                    fill("#79a83b");
                }
                else if (weath == "autumn") {
                    fill("#ff8453");
                }
                if (weath == "winter") {
                    fill("#ffffff");
                }
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("blue");
            } else if (matrix[y][x] == 5) {
                fill("black");
            }else if (matrix[y][x] == 6) {
                fill("orange");
            }else if (matrix[y][x] == 0) {
                fill("gray");
            } 
            rect(x * side, y * side, side, side);
        }
    }
}


socket.on('send matrix',nkarel)

function Winter() {
    socket.emit("winter");
}
function Summer() {
    socket.emit("summer");
}
function Spring() {
    socket.emit("spring");
}
function Autumn() {
    socket.emit("autumn");
}
function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addPuple() {
    socket.emit("add puple")
}
function addBomb() {
    socket.emit("add bomb")
}
function addVirus() {
    socket.emit("add virus")
}