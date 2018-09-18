let mongoose = require('mongoose');
let UserModel = require('../models/user');

const fixedId = '507f191e810c19729de860ee';
const fixedEmail = 'testemail@qk.com';
const fixedPassword = 'dk470S..e!sdjDs37d';

describe('/api/user TESTS', function () {

    before(async function () {
        let user = await UserModel.findOne({email: fixedEmail});
        if (!user) {
            user = new UserModel({
                _id: mongoose.Types.ObjectId(fixedId),
                email: fixedEmail,
                password: fixedPassword
            });
            await user.save();
        }
    });

    describe('GET /api/user', function () {
        it('return the list of persisted users', function (done) {
            request.get('/api/user')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    //request.close();
                    done();
                });
        });
    });

    describe('GET /api/user/id', function () {
        it('get a user', function (done) {
            request
                .get('/api/user/' + fixedId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    //expect(res.body['invite_id']).to.be.a('string');
                    expect(res.body._id).to.be.equal(fixedId);
                    expect(res.body.email).to.be.equal(fixedEmail);
                    //request.close();
                    done();
                });
        });
    });

    describe('POST /api/user', function () {
        it('create a new user', function (done) {
            request
                .post('/api/user')
                .send({
                    'email': 'test' + Math.random() + '@qk.com',
                    'password': 'test' +  Math.random()
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body._id).to.be.a('string');
                    //request.close();
                    done();
                });
        });
        it('create a new user with empty email', function (done) {
            request
                .post('/api/user')
                .send({
                    'email': '',
                    'password': 'test' +  Math.random()
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    expect(res.body.status).to.be.equal('error');
                    expect(res.body.code).to.be.equal('1001');
                    //request.close();
                    done();
                });
        });
        it('create a new user with an invalid email', function (done) {
            request
                .post('/api/user')
                .send({
                    'email': 'invalidEmail#123',
                    'password': 'test' +  Math.random()
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    expect(res.body.status).to.be.equal('error');
                    expect(res.body.code).to.be.equal('1001');
                    //request.close();
                    done();
                });
        });
    });

});
