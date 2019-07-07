const mongoose = require('mongoose');
const InviteModel = require('../../models/invite');
const { ObjectID: ObjectId } = require('mongodb');

const fixedId = '507f191e810c19729de860ea';
const fixedEmail = 'testemail@qk.com';

const resetPasswordExpire1Day = Date.now() + 3600000;

const data = [
    {
        _id: ObjectId(fixedId),
        "inviteType": "friend",
        "email": fixedEmail,
        "resetPasswordToken": "504e9738a8d2eec5a9c70545b3043f7821222ab9",
        "resetPasswordExpires": resetPasswordExpire1Day,
    },
    {
        _id: ObjectId(),
        "inviteType": "friend",
        "email": 'otherEmail@qk.com',
        "resetPasswordToken": "504e9738a8d2eec5a9c70545b3043f7821222aba",
        "resetPasswordExpires": resetPasswordExpire1Day,
    }
];

/**
 * Load the invites fixture
 * @return {Promise<[InviteModel]>}
 */
function load () {
    const savePromises = [];
    for (let i = 0; i < data.length; i++) {
        let invite = new InviteModel(data[i]);
        savePromises.push(invite.save());
    }
    return Promise.all(savePromises);
}

function reset () {
    return InviteModel.deleteMany({}).exec();
}

function resetAndLoad () {
    return new Promise((resolve, reject) => {
        reset().then(() => {
            load().then((invites) => {
                resolve(invites);
            }).catch(err => {
                reject(err)
            });
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    resetAndLoad: resetAndLoad,
    load: load,
    reset: reset
};
