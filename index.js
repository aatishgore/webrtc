const Peer = require('simple-peer');
const Faye = require('faye');
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
const userId = Math.random();
var client = new Faye.Client('http://localhost:8000/');
var constraints = {audio: true, video: true};
var video = document.querySelector("video");
const key ="/" + window.location.search.split('=')[1];

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, gotMedia, errorCallback);
function gotMedia(stream) {
  const peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream,
  });
  console.log("abcs");
  peer.on('signal', function (data) {
    console.log("caled");
    document.getElementById('yourid').value = JSON.stringify(data);
    client.publish(key, {
      partnerId: data,
      userId: userId
    });

  });

  client.subscribe(key, function(message) {
    console.log(message);
    if(message.userId != userId)
      peer.signal(message.partnerId);
  });

  document.getElementById("connect").addEventListener('click', function () {
    let otherId = JSON.parse(document.getElementById("otherid").value);
    peer.signal(otherId);
  });

  peer.on('stream',function(stream1){
    let video = document.getElementById('video');
    console.log(video);
    video.srcObject = stream1; 
    
    
    video.play();
  })
}



