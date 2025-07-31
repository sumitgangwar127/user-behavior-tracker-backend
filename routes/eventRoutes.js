const express = require('express');
const router = express.Router();
const { logEvents, getAllEvents } = require('../controllers/eventController');

router.post('/log-behavior', logEvents);
router.get('/events', getAllEvents);

module.exports = router;
