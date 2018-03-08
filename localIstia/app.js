var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodelocalistia');

var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');

var app = express();

var swig = new swig.Swig();
app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public')));

//envoie la requete vers routes/index.js
app.use('/', index);
//route vers routes/about.js
app.use('/about', about);
//idem mais vers routes/users.js
app.use('/users', users);

// Rendre la Bdd accessible à notre "router"
app.use(function(req,res,next){
    req.db = db;
    next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
