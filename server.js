var config = require('./config');

var express = require('express'),
	https   = require('https'),
	http    = require('http'),
	app     = express();

var dgram   = require('dgram'),
	message = new Buffer("money"),
	client  = dgram.createSocket("udp4");

app.get('/purchase.js', function(req, res) {
	client.send(message, 0, message.length, config.port, config.address);
	res.set({
		'Content-Type': 'text/javascript',
		'Content-Length': 0
	});
	res.send(200);
});

var port = config.env === 'dev' ? 3000 : 80;
http.createServer(app).listen(port);
console.log('Listening on port ' + port);