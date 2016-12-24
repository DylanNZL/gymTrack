/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var database = require('../db/database.js');
var router = express.Router();

var exercises = 0;

var currentSets = [];
var currentName = "Bench";

var currentSetNo = 1;

// GET workout page.
// Based on the query it will render the base page, or update the current workout based on what variables are sent
router.get('/', function(req, res) {
    var reps = req.query.reps;
    var weight = req.query.weight;
    var newEx = req.query.exercise;
    var startNew = req.query.startNew;

    if (reps && weight) { capture(res, reps, weight); }
    else if (newEx) { newExercise(res, newEx); }
    else if (startNew) { initialiseNewWorkout(res); }
    else { rend(res); }

});

function initialiseNewWorkout(res) {
    // Initialises variables again
    currentSets = [];
    currentName = "Select Workout";
    currentSetNo = 1;
    exercises = 0;
    rend(res);
}

// Add new set to the current group for this exercise, render page again
function capture(res, reps, weight) {
    var set = {
        number : currentSetNo,
        reps : reps,
        weight : weight
    };
    currentSets.push(set);
    currentSetNo++;

    rend (res);
    console.log("capture");
    console.log(currentSets);
}

// Start new exercise, clear current group, render page again
function newExercise(res, newEx) {
    console.log("new ex");
    // save current set to database
    database.addNewSet();

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
                    exercise : data,
                    currentSets : currentSets,
                    currentName : currentName,
                    currentSetNo : currentSetNo
                });
            }
        });
    } else {
        res.render('workout', {
            title: 'Exercise Tracker',
            exercise : data,
            currentSets : currentSets,
            currentName : currentName,
            currentSetNo : currentSetNo
        });
    }
}

module.exports = router;
