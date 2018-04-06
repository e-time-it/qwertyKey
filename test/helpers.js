var supertest = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var uuid = require('uuid');
var app = require('../app.js');

chai.use(chaiHttp);
global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.request = chai.request(app);