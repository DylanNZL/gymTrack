/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var router = express.Router();

/* GET workout page. */
router.get('/', function(req, res, next) {
    res.render('workout', { title: 'Exercise Tracker' });
});

module.exports = router;
