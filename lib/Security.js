'use strict';

/**
 * @var RegExp[] publicUrl
 **/
const publicUrl = [
    '/',
    /\/api-docs\/.*/
];

function isPublicUrl(url) {
    for(let i = 0; i < publicUrl.length; i++) {
        if (publicUrl[i] instanceof RegExp) {
            if (publicUrl[i].test(url)) {
                return true;
            }
        } else {
            if (publicUrl[i] === url) {
                return true;
            }
        }
    }
    return false;
}

function checkAuth (req, res, next) {
    console.log('checkAuth ' + req.url);

    if (!isPublicUrl(req.url) && (!req.session || !req.session.authenticated)) {
        res.status(403).send('unauthorised');
        return;
    }

    next();
}

module.exports = {
    checkAuth: checkAuth
};
