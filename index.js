const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URL;

// connect to MongoDB
mongoose.connect(dbUrl)
.then(() => {
  console.log("Connected to MongoDB");

  const app = express();

  const port = 5030;

  // middleware
  app.use(express.json());
  app.use(cors());

// connect routes
app.use('/api', postRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`😍💕Server has started http://localhost:${port}`);
});

})
.catch((err) => {
  console.log("Failed to connect to MongoDB", err);
});
