/**
 * Created by Dylan on 18-Dec-16.
 */
var express = require('express');
var router = express.Router();

/* GET progression/stats page. */
router.get('/', function(req, res, next) {
    res.render('progression', { title: 'Exercise Tracker' });
});

module.exports = router;
