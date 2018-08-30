let express = require('express');
let InviteModel = require('../models/invite');

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
router.get('/:id', function (req, res) {
    InviteModel.findOne({'_id': req.params.id}, function (err, invite) {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.send(invite);
        }
    });
});

/*POST invite CREATE*/
router.post('/', function (req, res, next) {
    InviteModel.create(req.body, function (err, invite) {
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
