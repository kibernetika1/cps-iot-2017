var http = require("http").createServer(handler);
var io = require("socket.io").listen(http); // socket.io for permanent connection between server and client
var fs=require("fs")
var firmata = require("firmata");

var board = new firmata.Board("/dev/ttyACM0", function(){ // ACM Abstract Control Model for serial communication with Arduino (could be USB)console.log("Connecting to Arduino");
   console.log("Conecting to Arduino");
  //  console.log("Activation of Pin 8");
  //  board.pinMode(8, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    console.log("Activation of Pin 13");
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
});
function handler(reg,res){ 
    fs.readFile(__dirname+"/button.html",
    function(err, data){
        if(err){
            res.writeHead(500,{"Content-type":"text/plain"});
            return res.end("Error loading html file");
        }
        res.writeHead(200);
        res.end(data);
    })
} 
http.listen(8080);
io.sockets.on("connection", function(socket) {
    socket.on("commandToArduino", function(commandNo){
        if (commandNo == "1") {
            board.digitalWrite(13, board.HIGH); // write HIGH on pin 13
        }
        if (commandNo == "0") {
            board.digitalWrite(13, board.LOW); // write LOW on pin 13
        }
    });
});

