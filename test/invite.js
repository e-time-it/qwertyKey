let mongoose = require('mongoose');
let InviteModel = require('../models/invite');

/**
 * Created by medd on 4/4/18.
 */

const fixedId = '507f191e810c19729de860ea';
const fixedEmail = 'testemail@qk.com';

describe('/api/invite TESTS', function () {

    before(async function () {
        let invite = await InviteModel.findOne({email: fixedEmail});
        if (!invite) {
            invite = new InviteModel({
                _id: mongoose.Types.ObjectId(fixedId),
                email: fixedEmail
            });
            await invite.save();
        }
    });

    describe('GET /api/invite', function () {
        it('return the list of persisted invites', function (done) {
            request.get('/api/invite')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    //request.close();
                    done();
                });
        });
    });

    describe('GET /api/invite/id', function () {
        it('get an invite', function (done) {
            request
                .get('/api/invite/' + fixedId)
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

    describe('POST /api/invite', function () {
        it('create a new invite', function (done) {
            request
                .post('/api/invite')
                .send({
                    'email': 'test' + Math.random() + '@qk.com'
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    //expect(res.body.invite_id).to.be.a('string');
                    //request.close();
                    done();
                });
        });
        it('create a new invite with empty email', function (done) {
            request
                .post('/api/invite')
                .send({
                    'email': ''
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
        it('create a new invite with an invalid email', function (done) {
            request
                .post('/api/invite')
                .send({
                    'email': 'invalidEmail#123'
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

    describe('UPDATE /api/invite/id', function () {
        it('update a new invite 404 expected', function (done) {
            request
                .put('/api/invite/' + fixedId)
                .send({
                    'email': 'testUpdate' + Math.random() + '@qk.com'
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    //request.close();
                    done();
                });
        });
    });

    describe('DELETE /api/invite/id', function () {
        it('delete an invite 404 expected', function (done) {
            request
                .delete('/api/invite/' + fixedId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    //request.close();
                    done();
                });
        });
    });

});
