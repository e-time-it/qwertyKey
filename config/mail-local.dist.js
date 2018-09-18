let transport = null;

/**
 * create mail transport for your environment
 */
/**
 * Sample configuration for dev/testing environment
 *
 * if (process.env.NODE_ENV === 'test') {
 *     const nodemailerMock = require('nodemailer-mock');
 *     transport = nodemailerMock.createTransport();
 * } else {
 *     let nodemailer = require('nodemailer');
 *     transport = nodemailer.createTransport({
 *         host: 'smtp.ethereal.email',
 *         port: 587,
 *         auth: {
 *             user: 'realuser@ethereal.email',
 *             pass: 'VerySecret'
 *         }
 *     });
 * }
 **/

/**
 * Sample configuration
 *     let nodemailer = require('nodemailer');
 *     transport = nodemailer.createTransport({
 *         host: 'smtp.sendgrid.net',
 *         port: 587,
 *         auth: {
 *             user: 'real.user',
 *             pass: 'VerySecret'
 *         }
 *     });
 */

if (process.env.NODE_ENV === 'test') {
    const nodemailerMock = require('nodemailer-mock');
    transport = nodemailerMock.createTransport();
} else {
    let nodemailer = require('nodemailer');
    transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'realuser@ethereal.email',
            pass: 'VerySecret'
        }
    });
}

module.exports = transport;

