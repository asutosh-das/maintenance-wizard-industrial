// 1. Import our packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import our custom route files
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');

// 2. Load the variables from the .env file into our app
dotenv.config();

// 3. Create our Express app
const app = express();

// 4. Setup Middleware (Code that runs between the request and the response)
app.use(cors()); // Allows our frontend to make requests to this backend
app.use(express.json()); // Tells Express to understand incoming data in JSON format

// 5. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.log('❌ Error connecting to MongoDB:', error.message);
  });

// 6. Hook up our APIs (Routes)
// If the URL starts with /api/auth, use the authRoutes file
app.use('/api/auth', authRoutes);

// If the URL starts with /api/equipment, use the equipmentRoutes file
app.use('/api/equipment', equipmentRoutes);

// A simple test route for the home page
app.get('/', (req, res) => {
  res.send('Maintenance Wizard Backend is running!');
});

// 7. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
