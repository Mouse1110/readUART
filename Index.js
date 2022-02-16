const express = require("express");
const app = express();
const test = require("./test");
var request = require("request");

// Serial Port
const SerialPort = require("serialport");

var serialPort = new SerialPort("COM2", {
    baudRate: 9600,
    parser: new SerialPort.parsers.Readline("\n")
});
var serialPort1 = new SerialPort("COM3"
);

app.get("/",function(req,res){
    res.send("Hello I/O");
});

function sendData(data){
    request.post({ headers: {'content-type' : 'application/json'}
               , url:"http://103.110.84.245:5000/data", body:JSON.stringify(data)}
               , function(error, response, body){
   console.log(body); 
}); 
}

serialPort.on('open',function(){
    console.log('open');
    serialPort.on('data', function(data){
        console.log("=================");
        console.log(data.toString('utf8'));
        var lData = (data.toString('utf8')).split(",");
        var json = {
            nd:lData[0],
            bxmt:lData[1],
            cdddd:lData[2],
            cdddtt:lData[3],
            cstt:lData[4],
            csd:lData[5],
            cb:lData[6],
            dahd:lData[7],
        }
        sendData(json);
    });
  // timeout();
});
function random(max){
    return Math.floor(Math.random() * max);
  }
function timeout() {
    setTimeout(function () {
        serialPort1.write(`${random(100)},${random(100)},${random(100)},${random(100)},${random(100)},${random(100)},${random(2)},${random(100)}`, function(err, results) {
          }); 
        timeout();
    }, 5000);
}

app.listen(3000,function(){
    console.log('Start Read UART and Send...');
})