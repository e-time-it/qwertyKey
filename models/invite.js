let mongoose = require('mongoose');
let validator = require('validator');

const inviteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    }
});

module.exports = mongoose.model('Invite', inviteSchema);
