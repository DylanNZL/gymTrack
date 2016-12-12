/**
 * Created by dylancross on 7/12/16.
 */

// Required files
var bookshelf = require('./bookshelf.js');


/**
 * Insert data
 * Ordered by:
 *  Exercise Table
 *  Name Table
 *  Target Table
 */

// Adds a new set of an exercise to the exercise table
function addNewSet(mName, mDate, mMSet, mReps, mWeight) {
    var obj = {
        name_id : mName,
        timestamp : mDate,
        mSet : mMSet,
        reps : mReps,
        weight : mWeight
    };
    bookshelf.knex('exercise').insert(obj).then(function (data) {

    }).catch(function (err) {
        console.error("addNewSet Error: " + err);
        console.log(obj);
    })
}

// Adds a new exercise to the definitions table
function addNewExercise(mName, mTarget) {
    checkIfNameExists(mName, function (result) {

    });

    bookshelf.knex('exercise_name').insert( { name : mName, target: mTarget } ).then(function (data) {

    }).catch(function (err) {
        console.error("addNewExercise Error: " + err);
        console.log(mName + " " + mTarget);
    })
}

// Adds a new target to the target definitions
function addNewTarget(mName) {
    bookshelf.knex('exercise_target').insert({ name : mName }).then(function (data) {

    }).catch(function (err) {
        console.error("addNewExercise: Error: + err");
        console.log(mName);
    })
}

/**
 * Retrieve Data
 * Order:
 *  Exercise Table
 *  Name Table
 *  Target Table
 */

/* Exercise Table queries */

// Get all the exercise data between to dates
function getExerciseHistoryFromDate(mStartTime, mEndTime) {
    bookshelf.knex('exercise').whereBetween('timestamp', [mStartTime, mEndTime]).select('name_id', 'mSet', 'reps', 'weight').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(true);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getExerciseHistoryFromDate Error:" + err);
        console.log(mStartTime, mEndTime);
        callback(0);
    })
}

// Get specific exercise data between two dates
function getSpecificExerciseHistoryFromDate(mName, mStartTime, mEndTime) {
    bookshelf.knex('exercise').whereBetween('timestamp', [mStartTime, mEndTime]).select('name_id', 'mSet', 'reps', 'weight').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(true);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getExerciseHistoryFromDate Error:" + err);
        console.log(mStartTime, mEndTime);
        callback(0);
    })
}

// Checks the exercise_name db against the provided name
function checkIfNameExists(mName, callback) {
    mName = mName.toLowerCase();
    bookshelf.knex('exercise_name').where('name', mName).select('name').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("checkIfNameExists Error: " + err);
        console.log(mName);
        callback(0);
    })
}

/* Name Table queries */

function getExercises(callback) {
    bookshelf.knex('exercise_name').select('name', 'target_id').then(function(data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getExercises Error: " + err);
        callback();
    })
}

function getExerciseFromId(mID, callback) {
    bookshelf.knex('exercise_name').where('_id', mID).select('name').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getExerciseFromId Error: " + err);
        console.log(mID);
        callback(0);
    })
}

function getExerciseFromName(mName, callback) {
    bookshelf.knex('exercise_name').where('name', mName).select('_id').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getExerciseFromName Error: " + err);
        console.log(mName);
        callback(0);
    })
}

/* Target Tale queries */

// Retrieve all targets, return an array
function getTargets(callback) {
    bookshelf.knex('exercise_targets').select('_id', 'target').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getTargets Error: " + err);
        callback(0);
    })
}

// Get the name of a target from an id
function getTargetFromId(mID, callback) {
    bookshelf.knex('exercise_targets').where('_id', mID).select('target').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getTargetFromId Error: " + err);
        console.log("mID");
        callback(0);
    })
}

// Get the id of a target from the name
function getTargetFromName(mName, callback) {
    bookshelf.knex('exercise_targets').where('target', mTarget).select('_id').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getTargetFromName Error: " + err);
        console.log("mName");
        callback(0);
    })
}

/**
 * Tests
 * Ordered by:
 *  Insert Tests
 *  Retrieve Tests
 *  Test running
 */

/* Inserting tests */

// Test adding a new set of exercise 12
function testAddNewSet() {
    addNewSet(12, 15, 2, 8, 65);
}

// Test adding a new exercise
function testAddNewExercise() {

}

// Test adding a target

/* Retrieving tests */

// Test the checking if a name exists with a bench press
function testCheckIfNameExists() {
    checkIfNameExists("bench press", function (result) {
        console.log(result);
    });
}

function runInsertTests() {
    testAddNewSet();
    // TODO: retrival statement to check if insertion was correct

}

function runRetrieveTests() {

}


// Insert
exports.addNewSet           = addNewSet;
exports.addNewExercise      = addNewExercise;
exports.addNewTarget        = addNewTarget;
// Retrieve

// Test
exports.runInsertTests      = runInsertTests;
exports.runRetrieveTests    = runRetrieveTests;