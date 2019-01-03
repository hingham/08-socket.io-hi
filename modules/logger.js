'use strict';
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');



const logError = (payload) =>{
  if(payload){
    console.error('file not saved ', payload);
  }
};

const logSuccess = (payload) =>{
  if(payload){
    console.log('file saved ', payload);
  }
};

socket.on('error', logError);
socket.on('saved', logSuccess);



