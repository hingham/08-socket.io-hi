'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');


let file = process.argv.slice(2).shift();

// enter ./modules/text.txt
socket.emit('file', file);


