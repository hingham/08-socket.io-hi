'use strict';
const logger = require('../modules/logger.js');

const faker = require('faker');

describe('files read and write', () =>{
    describe('file get read', () =>{
        it('the function return a buffer that is upper case', ()=>{
            let buf = Buffer.from('hello');
            let BUF = Buffer.from('HELLO');
            let result = logger.toUpper(buf);
            expect(result).toEqual(BUF);
        }); 

        it('the function calls readFile', ()=>{
            let result = logger.alterFile(faker.system.fileName);
            expect(logger.readFile).toHaveBeenCalled();
        }); 

    });
});