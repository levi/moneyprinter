var config = require('./config');

var SerialPort = require("serialport").SerialPort,
	serialPort = new SerialPort(config.serialDevice, {
		baudrate: config.baudrate
	});

var dgram  = require("dgram"),
	server = dgram.createSocket("udp4");

serialPort.on("open", function() {
	server.on("message", function (msg, rinfo) {
		serialPort.write("1", function(err, results) {
			console.log("Printer got " + msg + " from " + rinfo.address + ":" + rinfo.port);
		});
	});

	server.bind(config.port, config.address);
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
});