
const chai = require('chai');
const chaiHttp = require('chai-http');
const uuid = require('uuid');

const mockery = require('mockery');
const nodemailerMock = require('nodemailer-mock');
mockery.enable({
    warnOnUnregistered: false
});
mockery.registerMock('nodemailer', nodemailerMock);
const databaseTestLocal = require('./database-local');
mockery.registerMock('./database-local', databaseTestLocal);

const app = require('../app.js');

chai.use(chaiHttp);

global.app = app;
global.nodemailerMock = nodemailerMock;
global.uuid = uuid;
global.expect = chai.expect;
global.request = chai.request(app).keepOpen();
