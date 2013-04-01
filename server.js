var express = require('express'),
	app     = express();

var dgram   = require('dgram'),
	message = new Buffer("Purchase"),
	client  = dgram.createSocket("udp4");

app.get('/purchase.js', function(req, res) {
	client.send(message, 0, message.length, 41234, "localhost");
	res.setHeader('Content-Type', 'text/javascript');
	res.setHeader('Content-Length', 0);
	res.end();
});

app.listen(3000);
console.log('Listening on port 3000');