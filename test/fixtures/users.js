const UserModel = require('../../models/user');
const { ObjectID: ObjectId } = require('mongodb');

const fixedId = '507f191e810c19729de860ee';
const fixedEmail = 'testemail@qk.com';
const fixedPassword = 'dk470S..e!sdjDs37d';

const data = [
    {
        _id: ObjectId(fixedId),
        "status": "active",
        "email": fixedEmail,
        "password": fixedPassword
    },
    {
        _id: ObjectId(),
        "status": "active",
        "email": 'otherEmail@qk.com',
        "password": 'd!.lj3_823sdk'
    }
];

/**
 * Load the users fixture
 * @return {Promise<[UserModel]>}
 */
function load () {
    const savePromises = [];
    for (let i = 0; i < data.length; i++) {
        let user = new UserModel(data[i]);
        savePromises.push(user.save());
    }
    return Promise.all(savePromises);
}

function reset () {
    return UserModel.deleteMany({}).exec();
}

function resetAndLoad () {
    return new Promise((resolve, reject) => {
        reset().then(() => {
            load().then((users) => {
                resolve(users);
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
