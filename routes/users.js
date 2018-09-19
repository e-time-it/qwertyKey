let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let InviteModel = require('../models/invite');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let query = UserModel.find();
    query.exec(function (err, invites) {
        if (err) {
            next(err);
        } else {
            res.send(invites);
        }
    });
});

/*GET user READ*/
router.get('/:id', function (req, res, next) {
    UserModel.findOne({'_id': req.params.id}, function (err, invite) {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.send(invite);
        }
    });
});

/*POST user CREATE*/
router.post('/', function (req, res, next) {
    UserModel.create(req.body, function (err, user) {
        if (err) {
            if (err.errors) {
                let errors = [];
                for (let eName in err.errors) {
                    let eValue = err.errors[eName];
                    errors.push({path: eValue.path, kind: eValue.kind, message: eValue.message});
                }
                res.status(400).send({status: 'error', code: '1001', errors: errors});
            } else if (err.code === 11000) {
                res
                    .status(400)
                    .send({
                        status: 'error',
                        code: '1003',
                        errors: [{
                            path: 'email',
                            kind: 'duplicate',
                            message: err.message
                        }]
                    });
            } else {
                res.status(400).send({
                    status: 'error',
                    code: '1000',
                    errors: [{
                        path: '',
                        kind: 'unknown',
                        message: err.message
                    }]
                });
            }
        } else {
            InviteModel.create({
                email: user.email,
                inviteType: 'selfRegistration'
            }, function(err, invite) {
                if (err) {
                    console.error(err);
                    res.status(400).send(err);
                } else {
                    res.send(user);
                }
            });
        }
    });
});


module.exports = router;
