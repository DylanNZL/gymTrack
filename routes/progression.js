/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var database = require('../db/database.js');
var router = express.Router();

/* GET progression/stats page. */
router.get('/', function(req, res, next) {
    history(res, req);
});

// Get exercise history and pass it to the render function
function history(res, req) {
    var fromDate = req.query.from;
    var toDate = req.query.to;
    var all = req.query.allDates;
    var ex = req.query.exercise;
    console.log(ex + ' ' + all + ' ' + toDate + ' ' + fromDate);
    if (ex) {
        if (all) {
            database.getSpecificExerciseHistoryAll(ex, function (date) {
                if (date) {
                    rend(res, date, ex);
                } else {
                    rend(res, 0, ex);
                }
            })
        } else {
            database.getSpecificExerciseHistoryFromDate(ex, fromDate, toDate, function (date) {
                if (date) {
                    rend(res, date, ex);
                } else {
                    rend(res, 0, ex);
                }
            });
        }
    } else {
        rend(res, 0)
    }
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
module.exports = router;
