const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes'); 
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000; 

// Middleware
app.use(bodyParser.json()); 

// MongoDB connection string
const mongoURI = "mongodb+srv://hkim321:Mint123@cluster0.mair2.mongodb.net/Skeleton";

// Connect to MongoDB
mongoose.connect(mongoURI)
   .then(() => console.log('MongoDB connected successfully'))
   .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api', contactRoutes); 
app.use('/api', userRoutes); 

// Start the server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
