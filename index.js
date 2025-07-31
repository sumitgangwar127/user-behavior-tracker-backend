const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', eventRoutes);

const MONGO_URI = 'mongodb://localhost:27017/UB';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, '0.0.0.0', () => console.log('🚀 Server running on http://localhost:5000'));
  })
  .catch(err => console.error(' MongoDB connection failed:', err));
