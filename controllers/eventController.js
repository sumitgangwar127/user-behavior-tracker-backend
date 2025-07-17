const Event = require('../models/Event');

exports.logEvents = async (req, res) => {
    const events = req.body.events;

    if (!Array.isArray(events) || events.length === 0) {
        return res.status(400).json({ error: "Invalid events array" });
    }

    console.log("Received events =>", events);

    try {
        const formatted = events.map(e => ({
            sessionId: e.sessionId,
            page: e.page || null,
            type: e.type,
            timestamp: e.timestamp,
            duration: e.duration || null,
            lastVisitedTime: e.lastVisitedTime || null,
            element: e.element || null,
            userAgent: e.userAgent || '',
        }));

        await Event.insertMany(formatted);
        res.status(200).json({ message: 'Events saved successfully' });
    } catch (error) {
        console.error('Error saving events:', error);
        res.status(500).json({ error: 'Failed to save events' });
    }
};
