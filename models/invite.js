let mongoose = require('mongoose');
let validator = require('validator');

const inviteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: 'email must be valid',
            type: 'valid'
        }
    }
});

module.exports = mongoose.model('Invite', inviteSchema);
