var config = require('./config');

var express = require('express'),
	https   = require('https'),
	http    = require('http'),
	app     = express();

var dgram   = require('dgram'),
	client  = dgram.createSocket("udp4");

app.get('/purchase.js', function(req, res) {
	var message = new Buffer(req.ip);
	client.send(message, 0, message.length, config.port, config.clientAddress);
	res.set({
		'Content-Type': 'text/javascript',
		'Content-Length': 0
	});
	res.send(200);
});

app.listen(3000)
console.log('Listening on port 3000');