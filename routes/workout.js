/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var database = require('../db/database.js');
var router = express.Router();

var prevTemplate = {
    name : "",
    set : []
};

var setTemplate = {
    setNo : 0,
    reps : 0,
    weight : 0
};

var currentSets = {
    name : "",
    sets : []
};

var currentSetNo = 1;
var prev = [];

/* GET workout page. */
router.get('/', function(req, res, next) {
    var reps = req.query.reps;
    var weight = req.query.weight;
    var newEx = req.query.newEx;
    if (reps && weight) { capture(res, reps, weight); }
    else if (newEx) { newExercise(res, newEx) }
    else { rend(res); }

});

function capture(res) {
    var set = setTemplate;
    set.setNo = currentSetNo;
    set.reps = reps;
    set.weight = weight;
    currentSets.sets.push(set);
    rend (res);
}

function newExercise(res, newEx) {
    currentSets.name = newEx;
    currentSets.sets = [];
    currentSetNo = 1;
    rend(res);
}

function rend (res) {
    database.getExercises(function (data) {
        if (data) {
            res.render('workout', {
                title : 'Exercise Tracker',
                exercise : data,
                current : currentSets,
                currentSet : currentSetNo,
                previous : prev
            });
        } else {

        }
    });
}

module.exports = router;
