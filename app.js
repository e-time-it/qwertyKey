let express = require('express');
let path = require('path');
//var favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
require('./config/database');
let index = require('./routes/index');
let users = require('./routes/users');
let invites = require('./routes/invites');
let errorResponse = require('./lib/ErrorResponse');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/user', users);
app.use('/api/invite', invites);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// noinspection JSUnusedLocalSymbols
app.use(function (err, req, res, next) {
    errorResponse.sendErrorResponse(err, req, res);
});

module.exports = app;
