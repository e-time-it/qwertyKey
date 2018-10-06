let config = require('./mail-local');
let nodemailer = require('nodemailer');
transport = nodemailer.createTransport(config);
module.exports = transport;
