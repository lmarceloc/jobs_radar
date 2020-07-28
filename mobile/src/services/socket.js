import socketio from 'socket.io-client';

const socket = socketio ('http://192.168.25.229:3333', {
 autoConnect: false,
});

function subscribeToNewsComps(subscribeFunction){
 socket.on('newComp', subscribeFunction);
}

function connect (latitude, longitude, skills){
 socket.io.opts.query = { 
  latitude,
  longitude,
  skills,
 };
 
 socket.connect();
}

function disconnect() {
 if(socket.connected) {
  socket.disconnect();
 }
}

export {
 connect,
 disconnect,
 subscribeToNewsComps,
};