let express = require('express');
let InviteModel = require('../models/invite');
let UserModel = require('../models/user');
let ErrorResponse = require('../lib/ErrorResponse');

const router = express.Router({});

/**
 * @swagger
 *
 * /invite:
 *   get:
 *     summary: Get an invite's list
 *     description: Get an invite's list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: invite
 *         schema:
 *           $ref: '#/definitions/Invite'
 */
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

/**
 * @swagger
 *
 * /invite/:{token}:
 *   get:
 *     summary: Get a specific invite by token
 *     description: A token ...
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token get in email
 *     responses:
 *       200:
 *         description: invite
 *         schema:
 *           $ref: '#/definitions/Invite'
 */
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

/**
 * @swagger
 *
 * /invite/activate/:{token}:
 *   get:
 *     summary: Activate a user by token
 *     description: Activate, if possible, a user by token ...
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token get in email
 *     responses:
 *       200:
 *         description: invite
 *         schema:
 *           $ref: '#/definitions/User'
 */
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
