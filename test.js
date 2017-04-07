const spacebroClient = require('spacebro-client')

spacebroClient.connect('spacebro.space', 3333, {
	clientName: 'Philipp',
	channelName: 'testChannel'
})

//subscribe to event 'connected'
spacebroClient.on('connected', function() { console.log('welcome')})
 
//subrsribe to event
spacebroClient.on('up', function() {console.log('up')})
spacebroClient.on('down', function() {console.log('down')})

//wait because node is async and needs time to connect
setTimeout(function(){
	spacebroClient.emit('connected')
}, 1000);

