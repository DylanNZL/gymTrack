/**
 * Created by dylancross on 7/12/16.
 */

// Required files
var bookshelf = require('./bookshelf.js');


/* Insert data */

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
function addNewExercise(mName) {
    checkIfNameExists(mName, function (result) {

    });

    bookshelf.knex('exercise_name').insert( { name : mName } ).then(function (data) {

    }).catch(function (err) {
        console.error("addNewExercise Error: " + err);
        console.log(mName);
    })
}


/* Retrieve Data */

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


/* Tests */

// Test adding a new set of exercise 12
function testAddNewSet() {
    addNewSet(12, this.timeStamp, 2, 8, 65);
}
testAddNewSet();

// Test the checking if a name exists with a bench press
function testCheckIfNameExists() {
    checkIfNameExists("bench press", function (result) {

    });
}
testCheckIfNameExists();


