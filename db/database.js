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
function addNewSet(mName, mMSet, mReps, mWeight) {
    var obj = {
        name_id : mName,
        s : mMSet,
        r : mReps,
        w : mWeight
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

    bookshelf.knex('exercise_name').insert( { name : mName, target_id: mTarget } ).then(function (data) {

    }).catch(function (err) {
        console.error("addNewExercise Error: " + err);
        console.log(mName + " " + mTarget);
    })
}

// Adds a new target to the target definitions
function addNewTarget(mName) {
    bookshelf.knex('exercise_target').insert({ target : mName }).then(function (data) {

    }).catch(function (err) {
        console.error("addNewExercise: Error:" + err);
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
function getExerciseHistoryFromDate(mStartTime, mEndTime, callback) {
    bookshelf.knex('exercise').whereBetween('created_at', [mStartTime, mEndTime]).select().orderBy('created_at').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
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
function getSpecificExerciseHistoryFromDate(mName, mStartTime, mEndTime, callback) {
    bookshelf.knex('exercise').whereBetween('created_at', [mStartTime, mEndTime]).andWhere('name_id', mName).select().orderBy('created_at').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getSpecificExerciseHistoryFromDate Error:" + err);
        console.log(mStartTime, mEndTime);
        callback(0);
    })
}

function getSpecificExerciseHistoryAll(mName, callback) {
    bookshelf.knex('exercise').where('name_id', mName).select().orderBy('created_at').then(function (data) {
        if ((data) && (data.length > 0)) {
            callback(data);
        } else {
            callback(0);
        }
    }).catch(function (err) {
        console.error("getSpecificExerciseHistoryAll Error:" + err);
        console.log(mName);
        callback(0);
    })
}

/* Name Table queries */

// Checks the exercise_name db against the provided name
function checkIfNameExists(mName, callback) {
    mName = mName.toLowerCase();
    bookshelf.knex('exercise_name').where('name', mName).select().then(function (data) {
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

function getExercises(callback) {
    bookshelf.knex('exercise_name').select().orderBy('target_id').then(function(data) {
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
    bookshelf.knex('exercise_name').where('_id', mID).select().then(function (data) {
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
    bookshelf.knex('exercise_name').where('name', mName).select().then(function (data) {
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
    bookshelf.knex('exercise_targets').select().then(function (data) {
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
    bookshelf.knex('exercise_targets').where('_id', mID).select().then(function (data) {
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
    bookshelf.knex('exercise_targets').where('target', mTarget).select().then(function (data) {
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
 *
 */

/*
getExercises(function(data) {
    if (data) {
        data.forEach(function (d) {
            console.log(d.name);
        })
    } else {
        console.log(data);
    }
});
*/


// Insert
exports.addNewSet           = addNewSet;
exports.addNewExercise      = addNewExercise;
exports.addNewTarget        = addNewTarget;
// Retrieve
exports.getExerciseHistoryFromDate = getExerciseHistoryFromDate;
exports.getSpecificExerciseHistoryFromDate = getSpecificExerciseHistoryFromDate;
exports.getSpecificExerciseHistoryAll = getSpecificExerciseHistoryAll;
exports.getExercises        = getExercises;
