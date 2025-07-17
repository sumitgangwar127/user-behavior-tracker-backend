const express = require('express');
const router = express.Router();
const { logEvents } = require('../controllers/eventController');

router.post('/log-behavior', logEvents);

module.exports = router;
