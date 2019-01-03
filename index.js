'use strict';

const io = require('socket.io')(3000);


io.on('connection', (socket) =>{
  console.log('new connection', socket.id);


    socket.on('error', (payload)=>{
        console.log('error with save');
    socket.boardcast.emit('error', payload);
    });

    socket.on('file-saved', ( payload )=>{
        console.log('saved');
    socket.broadcast.emit('saved', payload);
    });

});




