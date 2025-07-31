const Event = require('../models/Event');

exports.logEvents = async (req, res) => {
  const events = req.body.events;

  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: "Invalid events array" });
  }

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
      browserName: e.browserName || '',
      browserVersion: e.browserVersion || '',
      osName: e.osName || '',
      platform: e.platform || '',
      vendor: e.vendor || '',
      language: e.language || '',
      timezone: e.timezone || '',
      referrer: e.referrer || '',

      // Screen info
      screenWidth: e.screenWidth || null,
      screenHeight: e.screenHeight || null,
      windowInnerWidth: e.windowInnerWidth || null,
      windowInnerHeight: e.windowInnerHeight || null,
      colorDepth: e.colorDepth || null,
      pixelDepth: e.pixelDepth || null,

      // Device capabilities
      deviceMemory: e.deviceMemory ?? null,
      hardwareConcurrency: e.hardwareConcurrency ?? null,
      isTouchDevice: e.isTouchDevice ?? false,
      isOnline: e.isOnline ?? null,
      saveData: e.saveData ?? null,
      cookieEnabled: e.cookieEnabled ?? null,

      // Performance
      jsHeapTotal: e.jsHeapTotal ?? null,
      jsHeapUsed: e.jsHeapUsed ?? null,
      networkType: e.networkType || ''
    }));



    await Event.insertMany(formatted);
    res.status(200).json({ message: 'Events saved successfully' });
  } catch (error) {
    console.error('Error saving events:', error);
    res.status(500).json({ error: 'Failed to save events' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
