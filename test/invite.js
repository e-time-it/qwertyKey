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
        it('return the list of persisted invites', function () {
            request.get('/api/invite')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                });
        });
    });

    describe('GET /api/invite/id', function () {
        it('get an invite', function () {
            request
                .get('/api/invite/' + fixedId)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    //expect(res.body['invite_id']).to.be.a('string');
                    expect(res.body._id).to.be.equal(fixedId);
                    expect(res.body.email).to.be.equal(fixedEmail);

                });
        });
    });

    describe('POST /api/invite', function () {
        it('create a new invite', function () {
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
                });
        });
    });

});
