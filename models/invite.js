let mongoose = require('mongoose');
let validator = require('validator');
let crypto = require('crypto');
let mailer = require('../config/mail');

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
    },
    inviteType: {
        type: String,
        enum: ['friend', 'resetPassword', 'selfRegistration'],
        default: 'friend',
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'used']
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

inviteSchema.pre('save', function (next) {
    let invite = this;
    crypto.randomBytes(20, (err, buf) => {
        invite.resetPasswordToken = buf.toString('hex');
        invite.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        next();
    });
});

inviteSchema.post('save', function (invite, next) {
    mailer.sendMail({
        from: 'qk@qk.org',
        to: invite.email,
        subject: 'Invite QK',
        text: `You received an invite to partecipate to QK party: ${invite.resetPasswordToken}`
    }).then(() => {next()}).catch(err => console.error('Fail to send mail: ', err));

});

inviteSchema.statics.verifyPasswordToken = function (token, time = Date.now(), cb) {
    this.findOne({'resetPasswordToken': token}, function (err, invite) {
        if (err) cb(err);
        if (invite.resetPasswordExpires >= time) {
            cb(null, invite);
        } else {
            cb (new Error("Reset password token expired"), null);
        }
    });
};

module.exports = mongoose.model('Invite', inviteSchema);
