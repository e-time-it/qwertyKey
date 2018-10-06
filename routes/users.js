let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let InviteModel = require('../models/invite');
let ErrorResponse = require('../lib/ErrorResponse');

/**
 * @swagger
 *
 * /user/:
 *   get:
 *     summary: Get an user's list
 *     description: Get an user's list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 */
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

/**
 * @swagger
 *
 * /user/{userid}:
 *   get:
 *     summary: Get a specific user
 *     description: Get an user
 *     parameters:
 *       - name: userid
 *         in: path
 *         required: true
 *         description: userid
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 */
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

/**
 * @swagger
 *
 * /user/:
 *   post:
 *     summary: Create an user
 *     description: Create an user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/', function (req, res, next) {
    UserModel.create(req.body, function (err, user) {
        if (err) {
           ErrorResponse.sendErrorRespons(err, req, res);
        } else {
            InviteModel.create({
                email: user.email,
                inviteType: 'selfRegistration'
            }, function(err, invite) {
                if (err) {
                    ErrorResponse.sendErrorRespons(err, req, res);
                } else {
                    res.send(user);
                }
            });
        }
    });
});

module.exports = router;
