const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// connect to MongoDB
mongoose.connect("mongodb+srv://opeyemionanuga40:NugaNuga1@cluster0.iclsc.mongodb.net/gmcblogdb?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log("Connected to MongoDB");

  const app = express();

  const port = 5030;

  // middleware
  app.use(express.json());

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
