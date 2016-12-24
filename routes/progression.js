/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var database = require('../db/database.js');
var router = express.Router();
var Handlebars = require('hbs');

/* GET progression/stats page. */
router.get('/', function(req, res, next) {
    history(res, req);
});

// Get exercise history and pass it to the render function
function history(res, req) {
    var date = req.query.date;
    var ex = req.query.exercise;
    if (ex) {
        var toDate = new Date();
        var fromDate = toDate;
        if (date == "month") {
            fromDate.setMonth(toDate.getMonth() - 1);
            fromDate.setHours(0,0,0,0);
            historyFromDate(res, ex, fromDate, toDate);
        } else if (date == "half") {
            fromDate.setMonth(toDate.getMonth() - 6);
            fromDate.setHours(0,0,0,0);
            historyFromDate(res, ex, fromDate, toDate);
        } else if (date == "year") {
            fromDate.setYear(toDate.getYear() - 1);
            fromDate.setHours(0,0,0,0);
            historyFromDate(res, ex, fromDate, toDate);
        } else {
            database.getSpecificExerciseHistoryAll(ex, function (date) {
                if (date) {
                    rend(res, date, ex);
                } else {
                    rend(res, 0, ex);
                }
            })
        }
    } else {
        rend(res, 0)
    }
}

function historyFromDate(res, ex, fromDate, toDate) {
    database.getSpecificExerciseHistoryFromDate(ex, fromDate, toDate, function (date) {
        if (date) {
            rend(res, date, ex);
        } else {
            rend(res, 0, ex);
        }
    });
}

// get exercise names, and render the page
function rend(res, exData, ex) {
    database.getExercises(function (data) {
        if (data) {
            if (ex && ex != 0) {
                res.render('progression', {
                    title: 'Exercise Tracker',
                    exercise: data,
                    history: exData,
                    exName: data[ex - 1].name
                });
            } else {
                res.render('progression', {
                    title: 'Exercise Tracker',
                    exercise: data,
                    history : exData,
                    exName : 0
                });
            }
        } else {
            res.render('progression', {
                title: 'Exercise Tracker',
                exercise: 0,
                history : exData,
                exName : 0
            });
        }
    });
}

Handlebars.registerHelper("day", function (date) {
    date = new Date(date);
    return parseInt(date.getDate());
});

Handlebars.registerHelper("month", function (date) {
    date = new Date(date);
    return parseInt(date.getMonth());
});

Handlebars.registerHelper("year", function (date) {
    date = new Date(date);
    return parseInt(date.getFullYear());
});

module.exports = router;
