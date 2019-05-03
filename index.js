const Peer = require('simple-peer');
const Faye = require('faye');
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
const userId = Math.random();
var client = new Faye.Client('https://gmat.php-dev.in:8095/');
var constraints = { audio: true, video: true };
var video = document.querySelector("video");
const key = "/" + window.location.search.split('=')[1];
let initiator = location.hash === '#init';
let webRTCData = null;

function errorCallback(error) {
  console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, gotMedia, errorCallback);
function gotMedia(stream) {
  const peer = new Peer({
    initiator: initiator,
    trickle: false,
    stream: stream,
    iceTransportPolicy: 'relay',
    config: {

      iceServers: [
        { url: 'stun:stunserver.org' },
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        },
      ]
    }
  });
  console.log("abcs");
  peer.on('signal', function (data) {
    console.log("webRTC data");
    console.log(data)
    webRTCData = data;
    client.publish(key, {
      partnerId: webRTCData,
      userId: userId
    });

  });

  client.subscribe(key, function (message) {
    console.log(message);
    if (message.userId != userId)
      peer.signal(message.partnerId);
  });

  peer.on('stream', function (stream1) {
    let video = document.getElementById('video1');
    //var video = document.createElement('video');
    console.log(video);
    video.srcObject = stream1;
    video.play();
    //document.getElementById("video").appendChild(video);


  });
}







