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
server.listen(8083);
