const spacebroClient = require('spacebro-client')

spacebroClient.connect('spacebro.space', 3333, {
	clientName: 'Philipp',
	channelName: 'testChannel'
})

var express = require('express');
var app = express();                    //initializes app to be a function handler
var http = require('http');
var server = http.createServer(app);    //supply the function handler to an HTTP server 
var io = require('socket.io').listen(server);


server.listen(8080);                    //HTTP server listens on port defined in config folder, set to 8080

app.get('/', function(req, res){    //GET request on homepage
  res.sendFile(__dirname + '/index.html');  //serves the index file to the browser
});

io.sockets.on('connection', function (socket) {
  console.log('ioConnected');
});


//subscribe to event 'connected'
spacebroClient.on('connected', function() { console.log('welcome')})
 

//subrsribe to event
spacebroClient.on('up', function() {
	console.log('up')
	io.sockets.emit('spaceUp')
})

spacebroClient.on('down', function() {
	console.log('down')
	io.sockets.emit('spaceDown')
})

//wait because node is async and needs time to connect
setTimeout(function(){
	spacebroClient.emit('connected')
}, 1000);
