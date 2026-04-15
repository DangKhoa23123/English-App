const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/events', require('./routes/eventRoutes'));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});