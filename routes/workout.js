/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var database = require('../db/database.js');
var router = express.Router();

var exercises = 0;

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

// GET workout page.
// Based on the query it will render the base page, or update the current workout based on what variables are sent
router.get('/', function(req, res, next) {
    //console.log(req.query);
    var reps = req.query.reps;
    var weight = req.query.weight;
    var newEx = req.query.exercise;
    //console.log(reps + ' ' + weight + ' ' + newEx);
    if (reps && weight) { capture(res, reps, weight); }
    else if (newEx) { newExercise(res, newEx) }
    else { rend(res); }

});

// Add new set to the current group for this exercise, render page again
function capture(res, reps, weight) {
    console.log("capture");
    console.log(currentSets);
    var set = setTemplate;
    set.setNo = currentSetNo;
    set.reps = reps;
    set.weight = weight;
    currentSets.sets.push(set);
    currentSetNo++;
    rend (res);
}

// Start new exercise, clear current group, render page again
function newExercise(res, newEx) {
    console.log("new ex");
    // Add current to the previous array
    var addPrev = prevTemplate;
    addPrev.name = currentSets.name;
    addPrev.set = currentSets.sets;
    prev.push(addPrev);
    // Reset current array
    currentSets.name = newEx;
    currentSets.sets = [];
    currentSetNo = 1;
    rend(res);
}

// Render page, pull all exercises in the db for the drop down menu
function rend (res) {
    if (exercises === 0) {
        database.getExercises(function (data) {
            if (data) {
                exercises = 0;
                res.render('workout', {
                    title: 'Exercise Tracker',
                    exercise: data,
                    current: currentSets,
                    currentSet: currentSetNo
                });
            }
        });
    } else {
        res.render('workout', {
            title: 'Exercise Tracker',
            exercise: data,
            current: currentSets,
            currentSet: currentSetNo,
            previous: prev
        });
    }
}

module.exports = router;
