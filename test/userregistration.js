let mongoose = require('mongoose');
let InviteModel = require('../models/invite');
let UserModel = require('../models/user');

const fixedId = '507f191e810c19729de860ea';
const fixedEmail = 'testemail@qk.com';

describe('User registration', function () {

    describe('User do a self registration', function () {
        const email = 'self_user' + Math.random() + '@qk.com';
        const password = 'self_user' +  Math.random();
        let user = null,
            invite = null;

        it('The user post a new user', function (done) {
            request
                .post('/api/user')
                .send({
                    'email': email,
                    'password': password
                })
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body._id).to.be.a('string');
                    user = res.body;
                    done();
                });
        });

        it('The user retrieve the invite on email', function () {

        });

        it('The user activate the himself opening the invite link', function() {

        });

    });



});
