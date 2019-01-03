'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const toUpper = (buffer) => {return Buffer.from(buffer.toString().toUpperCase()); };

let file = process.argv.slice(2).shift();


const alterFile = (file) => {
  console.log('alterFile called, function');
  readFile(file)
  .then( (text) =>{ return toUpper(text);})
  .then( (text) => { writeFile('new-file.txt', text )
    .then( () =>{ 
      console.log('file-saved');
      socket.emit('file-saved', file); })  
    .catch( (err) =>{ socket.emit('file-error', file); }); 
   })
   .then( () =>{ socket.emit('file-saved', file); })  
  .catch( (err) =>{ socket.emit('file-error', file); });
}

if(file){
  alterFile(file);
}

// enter ./modules/text.txt
socket.emit('file', file);


