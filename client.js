var SerialPort = require("serialport").SerialPort;
var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var serialPort = new SerialPort('/dev/tty.usbmodemfa131', {
	baudrate: 9600
});

serialPort.on("open", function() {
	server.on("message", function (msg, rinfo) {
		serialPort.write("1", function(err, results) {
			console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
		});
	});

	server.bind(41234);
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});