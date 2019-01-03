'use strict';

const io = require('socket.io')(3000);


io.on('connection', (socket) =>{
  console.log('new connection', socket.id);

  socket.on('file', file =>{
    console.log(file);
    socket.broadcast.emit('read', file);
  });

    socket.on('file-saved', file=>{
        console.log('saved');
    socket.broadcast.emit('saved', file);
    });

    socket.on('error', file=>{
        console.log('error with save');
    socket.boardcast.emit('bad-file', file);
    });

});




