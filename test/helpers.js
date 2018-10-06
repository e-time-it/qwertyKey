
let chai = require('chai');
let chaiHttp = require('chai-http');
let uuid = require('uuid');

let mockery = require('mockery');
let nodemailerMock = require('nodemailer-mock');
mockery.enable({
    warnOnUnregistered: false
});
mockery.registerMock('nodemailer', nodemailerMock);

let app = require('../app.js');

chai.use(chaiHttp);

global.app = app;
global.nodemailerMock = nodemailerMock;
global.uuid = uuid;
global.expect = chai.expect;
global.request = chai.request(app).keepOpen();
