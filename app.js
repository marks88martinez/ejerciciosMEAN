'use strict';
//loanding dependencies
var express = require('express');
var path = require('path');

//initializing express application
var app = express();

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//logger
var logger = require('morgan');
app.use(logger('dev'));

//Cookies / Session
var cookieParser = require('cookie-parser');
app.use(cookieParser());



// Layout setup
var exphbs = require('express-handlebars');
// Stylus setup

var stylus = require('style');
var nib = require('nib');

//Handlebars setup
app.engine('.nib', exphbs({
  extname:'.nbs',
  defaultLayout: 'main',
  LayautsDir: __dirname + '/views/Layout',
  partialsDir: __dirname + '/views/partials',

}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));






//Routes
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
