var moment = require('moment');

const portName = process.argv[2];
const portBaudRate = 9600;
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const serialParser = new parsers.Readline({
  delimiter: '\r\n'
});
const serialPort = new SerialPort(portName, {
  baudRate: portBaudRate
});
serialPort.on('open', serialPort_open);
serialPort.pipe(serialParser);
serialParser.on('data', serialPort_data);
serialPort.on('close', serialPort_close);
serialPort.on('error', serialPort_error);

function serialPort_open() {
  console.log('SERIAL Port Open. Baud Rate: ' + portBaudRate);

}
function serialPort_data(data) {
  console.log(data);
  var dataArray = data.split(";");
  if(dataArray[0] == "3913"){
    var moment_obj = moment();
    var year = moment_obj.format("YYYY");
    var month = moment_obj.format("MM");
    var date = moment_obj.format("DD");
    var hour = moment_obj.format("HH");
    var minute = moment_obj.format("mm");
    var second = moment_obj.second();
    var millisecond = moment_obj.millisecond();
    var command = year + ";" + month + ";" + date + ";" + hour + ";" + minute + ";" + second + ";";
    console.log(">>> " + command);
    serialPort.write("3913;" + command + "\r\n");
  }
}

function serialPort_close() {
  console.log('SERIAL Port Closed');
}
function serialPort_error(error) {
  console.log('SERIAL Port ' + error);
}
