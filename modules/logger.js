'use strict';

const util = require('util');
const fs = require('fs');

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const logger = {};
logger.save = payload =>{
  if(payload){
    console.log('file saved ', `${payload}`);
  }
}
socket.on('saved', logger.save);


socket.on('read', alterFile);

module.exports = {logger};


const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const toUpper = (buffer) => {return Buffer.from(buffer.toString().toUpperCase()); };


function alterFile(file){
  console.log('alterFile called');
  readFile(file)
  .then( (text) =>{ return toUpper(text);})
  .then( (text) => { writeFile('new-file.txt', text ); })
  .then( () => {
    // console.log(`${file} file saved`);
    socket.emit('file-saved', file);
  })
  .catch( (err) =>{
    console.log('error', err); 
  socket.emit('file-error', file);
  });
}

module.exports = { toUpper };



