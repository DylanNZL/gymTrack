var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Pages
var index = require('./routes/index'),
    users = require('./routes/users'),
    progression = require('./routes/progression'),
    workout = require('./routes/workout');

// JS files
var database = require('./db/database.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/progression', progression);
app.use('/workout', workout);

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

//database.addNewSet(1, Date.now(), 2, 10, 65);
/*database.getSpecificExerciseHistoryAll(1, function (data) {
    if (data != 0) {
        //console.log(data);
        data.forEach(function (dat) {
            console.log(dat.s + 'x' + dat.r + '@' + dat.w);
        });
    } else {
        console.log('empty');
        console.log(data);
    }
});*/

/*
database.getExercises(function(data) {
    if (data) {
        data.forEach(function (d) {
            console.log(d.name);
        })
    } else {
        console.log(data);
    }
});
*/


module.exports = app;
