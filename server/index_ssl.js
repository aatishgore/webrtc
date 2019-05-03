var https = require('https'),
    fs = require('fs'),
    faye = require('faye');

var options = {
  key: fs.readFileSync('keys/private.key'),
  cert: fs.readFileSync('keys/primary.crt')
};

var server = https.createServer(options),
    bayeux = new faye.NodeAdapter({mount: '/'});

bayeux.attach(server);
server.listen(8095);

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