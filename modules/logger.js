'use strict';

const util = require('util');
const fs = require('fs');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('saved', save);
function save (payload) {
  if(payload){
    console.log('file saved ', `${payload}`);
  }
}

socket.on('read', alterFile);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const toUpper = (buffer) => {return Buffer.from(buffer.toString().toUpperCase()); };

function alterFile(file){
  console.log('alterFile called');
  readFile(file)
  .then( (text) =>{ return toUpper(text);})
  .then( (text) => { writeFile('new-file.txt', text ); })
  .then( () => {socket.broadcast.emit('file-saved', file); })
  .catch( (err) =>{ socket.emit('file-error', file); });
}

module.exports = { toUpper, alterFile,  };



