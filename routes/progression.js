/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var database = require('../db/database.js');
var router = express.Router();

/* GET progression/stats page. */
router.get('/', function(req, res, next) {
    rend(res);
});

function rend(res) {
    //database.getExerciseHistoryFromDate();
    database.getExercises(function (data) {
        if (data) {
            res.render('progression', { title: 'Exercise Tracker', exercise : data });
        } else {
            res.render('progression', {title: 'Exercise Tracker', exercise: 0});
        }
    });

}
module.exports = router;
