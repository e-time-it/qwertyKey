const express = require('express');
const path = require('path');
//var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const database = require('./config/database');
const index = require('./routes/index');
const users = require('./routes/users');
const invites = require('./routes/invites');
const errorResponse = require('./lib/ErrorResponse');
const security = require('./lib/Security');

const app = express();

app.use(session({
    secret: 'qwerty key secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: database.getConnection()
    })
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(security.checkAuth);

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
