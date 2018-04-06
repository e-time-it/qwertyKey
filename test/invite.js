/**
 * Created by medd on 4/4/18.
 */

describe('/api/invite TESTS', function() {
    describe('GET /api/invite', function() {
        it('return the list of persisted invites', function() {
            request.get('/api/invite')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done(err);
                });
        });
    });
});