
let mongoose = require('mongoose');
let ValidationError = mongoose.Error.ValidationError;
let mongodb = require('mongodb');
let MongoError = mongodb.MongoError;

class ErrorResponse {
    /**
     * Constructor
     * @param {number} code
     */
    constructor(code = 1000) {
        this.httpStatus = 500;
        this.status = 'error';
        this.code = code;
        this.errors = [];
    }

    /**
     * Add an error (or an array of errors) to the error response
     * @param {string|Array|Object} err
     * @param {?string} kind
     * @param {?string} message
     */
    addError(err, kind = null, message = null) {
        if (typeof err === 'string') {
            this.errors.push({path: err, kind: kind, message: message});
        } else if (err instanceof Array) {
            this.errors.concat(err);
        } else {
            this.errors.push(err);
        }
    }
}

const _mongoErrorList = {
    '11000': {kind: 'duplicate', code: 1003}
};

/**
 * return translated mongo error code
 * @param {number} mongoCode
 * @return Object
 */
function mongoGetError(mongoCode) {
    let err = _mongoErrorList[mongoCode];
    if (!err) {
        err = {
            'kind': 'unknown',
            'code': mongoCode
        }
    }
    return err;
}

/**
 *
 * @param {Error} err
 * @param {null|Object} options
 */
function createErrorResponse(err, options = null) {
    let eResponse = new ErrorResponse();

    // mongoose validation error
    if (err instanceof ValidationError) {
        for (let eName in err.errors) {
            let eValue = err.errors[eName];
            eResponse.addError(eValue.path, eValue.kind, eValue.message);
        }
        eResponse.code = 1001;
        eResponse.httpStatus = 400;
    } else if (err instanceof MongoError) {
        let mongoError = mongoGetError(err.code);
        eResponse.addError(err.name, mongoError.kind, err.errmsg);
        eResponse.code = mongoError.code;
        eResponse.httpStatus = 400;
    } else {
        let path = err.path || 'unknown';
        let kind = err.kind || 'unknown';
        let message = err.message || 'no message';
        eResponse.addError(path, kind, message);
        eResponse.code = 1000;
        eResponse.httpStatus = 500;
    }
    if (options && options.code) {
        eResponse.code = options.code
    }
    return eResponse;
}

function sendErrorRespons(err, req, res) {
    let errorResponse = createErrorResponse(err);
    res.status(errorResponse.httpStatus).send(createErrorResponse(err));
}

module.exports.ErrorResponse = ErrorResponse;
module.exports.createErrorResponse = createErrorResponse;
module.exports.sendErrorRespons = sendErrorRespons;
