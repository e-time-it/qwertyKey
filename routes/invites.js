let express = require('express');
let InviteModel = require('../models/invite');
let UserModel = require('../models/user');

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
router.get('/', async function (req, res, next) {
    try {
        const invites = await InviteModel.find().exec();
        res.send(invites);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 *
 * /invite/{token}:
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
router.get('/:id', async function (req, res, next) {
    try {
        const invite = await InviteModel.findOne({'_id': req.params.id}).exec();
        res.send(invite);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 *
 * /invite/activate/{token}:
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
router.get('/activate/:id', async function (req, res, next) {
    try {
        const invite = await InviteModel.verifyPasswordToken(req.params.id, Date.now());
        let  user = await UserModel.findOne({email: invite.email}).exec();
        user.status = 'active';
        user = await user.save();
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.post('/:id/activate', async function (req, res, next) {
    try {
        const invite = await InviteModel.verifyPasswordToken(req.params.id, Date.now());
        let user = await UserModel.findOne({email: invite.email});
        user.status = 'active';
        user = await user.save();
        res.send(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * @swagger
 *
 * /invite:
 *   post:
 *     summary: create an invite
 *     description: Create a new invite
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: invite
 *         description: the invite to create
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Invite'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: the new invite
 *         schema:
 *           $ref: '#/definitions/Invite'
 */
router.post('/', async function (req, res, next) {
    try {
        const invite = await InviteModel.create(req.body);
        res.send(invite);
    } catch (err) {
        next(err);
    }
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
