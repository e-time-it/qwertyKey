let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let InviteModel = require('../models/invite');

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
router.get('/',  async function (req, res, next) {
    try {
        const invites = await UserModel.find().exec();
        res.send(invites);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 *
 * /user/{userId}:
 *   get:
 *     summary: Get a specific user
 *     description: Get an user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: userId
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/:id', async function (req, res, next) {
    try {
        const invite = await UserModel.findOne({'_id': req.params.id}).exec();
        res.send(invite);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 *
 * /user:
 *   post:
 *     summary: Create an user
 *     description: Create an user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: the user to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: the newly created user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/', async function (req, res, next) {
    try {
        const user = await UserModel.create(req.body);
        await InviteModel.create({
            email: user.email,
            from: user.email,
            inviteType: 'selfRegistration'
        });
        res.send(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
