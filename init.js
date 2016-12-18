/**
 * Created by dylancross on 11/12/16.
 * This file intialises the database with names of common exercises that i could remember
 */

var database = require('./database.js');

var target = [];
target.push("Chest");
target.push("Back");
target.push("Legs");
target.push("Shoulders");
target.push("Triceps");
target.push("Biceps");
target.push("Forearms");
target.push("Cardio");

function loadTargets() {
    target.forEach(function (t) {
        database.addNewTarget(t);
    })
}

var exercises = [];
exercises.push({ name: "bench press", target : "1" });
exercises.push({ name: "squat", target : "3" });
exercises.push({ name: "deadlift", target : "2" });
exercises.push({ name: "overhead press", target : "4" });
exercises.push({ name: "incline press", target : "1" });
exercises.push({ name: "shoulder press", target : "4" });
exercises.push({ name: "dumbell bench press", target : "1" });
exercises.push({ name: "dumbell incline press", target : "1" });
exercises.push({ name: "dumbell decline press", target : "1" });
exercises.push({ name: "dumbell shoulder press", target : "4" });
exercises.push({ name: "bent-over rows", target : "2" });
exercises.push({ name: "t-bar rows", target : "2" });
exercises.push({ name: "lat pulldown", target : "2" });
exercises.push({ name: "pull ups", target : "2" });
exercises.push({ name: "chin ups", target : "2" });
exercises.push({ name: "muscle ups", target : "2" });
exercises.push({ name: "lateral raises", target : "4" });
exercises.push({ name: "front raises", target : "4" });
exercises.push({ name: "tricep dips", target : "5" });
exercises.push({ name: "tricep pushdown", target : "5" });
exercises.push({ name: "skullcrusher", target : "5" });
exercises.push({ name: "tricep extension", target : "5" });
exercises.push({ name: "bicep curls", target : "6" });
exercises.push({ name: "hammer curls", target : "6" });
exercises.push({ name: "hack squat", target : "3" });
exercises.push({ name: "front squat", target : "3" });
exercises.push({ name: "leg press", target : "3" });
exercises.push({ name: "leg extension", target : "3" });
exercises.push({ name: "leg curls", target : "3" });
exercises.push({ name: "wrist curls", target : "7" });
exercises.push({ name: "running", target : "8" });
exercises.push({ name: "walking", target : "8" });
exercises.push({ name: "cycling", target : "8" });
exercises.push({ name: "eliptical", target : "8" });
//exercises.push({ name: "", target : "" });

function loadNames() {
    exercises.forEach(function (ex) {
        database.addNewExercise(ex.name, ex.target);
    });
}

// Test
loadTargets();
loadNames();

exports.loadTargets = loadTargets;
exports.loadNames   = loadNames;
