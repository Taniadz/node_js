var createError = require('http-errors');
var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config');
var log = require('lib/log')(module);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.set('port', config.get("port"));
http.createServer(app).listen(config.get('port'), function () {
   log.info("Express server listening on port " + config.get('port')) ;
});

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


