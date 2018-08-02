/**
 * Created by medd on 4/4/18.
 */

describe('/api/invite TESTS', function() {
  describe('GET /api/invite', function() {
    it('return the list of persisted invites', function() {
      request.get('/api/invite')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
    });
  });
  describe('POST /api/invite', function() {
    it('create a new invite', function() {
      request
        .post('/api/invite')
        .send({
          'email': 'test@qk.com'
        })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect().to.be.string(res['invite_id']);
        });
    });
  });
});
