var http = require('http'),
    faye = require('faye');

var server = http.createServer(),
    bayeux = new faye.NodeAdapter({mount: '/'});

bayeux.attach(server);
server.listen(8000);
bayeux.on('handshake', function(clientId) {
  // event listener logic
  console.log("handshake");
  console.log(clientId)
});

bayeux.on('subscribe', function(clientId,channel) {
  // event listener logic
  console.log("subscribe");
  console.log(clientId);
  console.log(channel);
});