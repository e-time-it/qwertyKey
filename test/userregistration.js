
describe('User registration', function () {
    before(function() {
        nodemailerMock.mock.reset();
    });

    describe('User do a self registration', function () {
        const email = 'self_user' + Math.random() + '@qk.com';
        const password = 'self_user' +  Math.random();
        let user = null,
            resetToken = null;

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

        it('The user retrieve the invite on email', function (done) {
            let inbox = nodemailerMock.mock.sentMail();
            expect(inbox.length).to.be.equal(1);
            let mailBodyParsed = inbox[0].text.match(/QK party: (.*)$/);
            expect(mailBodyParsed.length).to.be.equal(2);
            resetToken = mailBodyParsed[1];
            done();
        });

        it('The user activate the himself opening the invite link', function(done) {
            request
                .get('/api/invite/activate/' + resetToken)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.status).to.be.equal('active');
                    done();
                });
        });

    });



});
