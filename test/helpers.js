//var supertest = require('supertest');
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../app.js';

chai.use(chaiHttp);

global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.request = chai.request(app);
