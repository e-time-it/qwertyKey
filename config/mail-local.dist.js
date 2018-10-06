

/**
 * create mail transport for your environment
 */
/**
 * Sample configuration for dev environment
 *
 *     module.exports = {
 *         host: 'smtp.ethereal.email',
 *         port: 587,
 *         auth: {
 *             user: 'realuser@ethereal.email',
 *             pass: 'VerySecret'
 *         }
 *     };
 *
 **/

/**
 * Sample configuration
 *     module.exports = {
 *         host: 'smtp.sendgrid.net',
 *         port: 587,
 *         auth: {
 *             user: 'real.user',
 *             pass: 'VerySecret'
 *         }
 *     };
 */

module.exports = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'realuser@ethereal.email',
        pass: 'VerySecret'
    }
};


