var express = require('express');
var InviteModel = require ('../models/invite');
var router = express.Router({});

/*GET invite LIST*/
router.get('/', function(req, res, next) {
  let query = InviteModel.find();
  query.exec(function(err, invites){
    if(err) {
      next(err);
    } else {
      res.send(invites);
    }
  });
});

/*GET invite READ*/
router.get('/:id', function(req, res) {
    res.status(404).send('not found');
});

/*POST invite CREATE*/
router.post('/', function(req, res, next) {
  InviteModel.create(req.body, function(err, invite) {
    if (err) {
      console.error(err);
      next(err);
    } else {
      res.send({invite_id: invite._id});
    }
  });
});

/*PUT invite UPDATE*/
router.put('/:id', function(req, res) {
    res.status(404).send('not found');
});

/*DELETE invite DELETE*/
router.delete('/:id', function(req, res) {
    res.status(404).send('not found');
});

module.exports = router;
