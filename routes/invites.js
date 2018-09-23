let express = require('express');
let InviteModel = require('../models/invite');
let UserModel = require('../models/user');
let ErrorResponse = require('../lib/ErrorResponse');

const router = express.Router({});

/*GET invite LIST*/
router.get('/', function (req, res, next) {
    let query = InviteModel.find();
    query.exec(function (err, invites) {
        if (err) {
            next(err);
        } else {
            res.send(invites);
        }
    });
});

/*GET invite READ*/
router.get('/:id', function (req, res, next) {
    InviteModel.findOne({'_id': req.params.id}, function (err, invite) {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.send(invite);
        }
    });
});

router.get('/activate/:id', function (req, res, next) {
    InviteModel.verifyPasswordToken(req.params.id, Date.now(), function (err, invite) {
        if (err) {
            console.error(err);
            next(err);
        } else {
            // find user
            UserModel.findOne({email: invite.email}, function(err, user) {
                if (err) {
                    console.error(err);
                    next(err);
                } else {
                    // activate user
                    user.status = 'active';
                    user.save( function(err, user) {
                       if (err) {
                           console.error(err);
                           next(err);
                       } else {
                           res.send(user);
                       }
                    });
                }
            });
        }
    });
});

/*POST invite CREATE*/
router.post('/', function (req, res, next) {
    InviteModel.create(req.body, function (err, invite) {
        if (err) {
            ErrorResponse.sendErrorRespons(err, req, res);
        } else {
            res.send(invite);
        }
    });
});

/*PUT invite UPDATE*/
router.put('/:id', function (req, res) {
    res.status(404).send('update an invite is not allowed/present operation');
});

/*DELETE invite DELETE*/
router.delete('/:id', function (req, res) {
    res.status(404).send('delete an invite is not allowed/present operation');
});

module.exports = router;
