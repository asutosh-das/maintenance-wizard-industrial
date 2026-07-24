// 1. Import our packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Load the variables from the .env file into our app
// THIS MUST HAPPEN BEFORE WE IMPORT OUR ROUTES!
dotenv.config();

// Import our custom route files
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const aiRoutes = require('./routes/aiRoutes'); // <-- Imported the new AI routes

// 3. Create our Express app
const app = express();

// 4. Setup Middleware (Code that runs between the request and the response)
app.use(cors()); // Allows our frontend to make requests to this backend
app.use(express.json()); // Tells Express to understand incoming data in JSON format

// 5. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch((error) => console.log('❌ Error connecting to MongoDB:', error.message));

// 6. Hook up our APIs (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/ai', aiRoutes); // <-- Added the AI API route

app.get('/', (req, res) => {
  res.send('Maintenance Wizard Backend is running!');
});

// --- NEW ESSENTIAL FEATURE: Global Error Handler ---
// If any of our routes throw an error and don't catch it, it ends up here.
// This prevents our server from crashing and sends a clean message to the frontend.
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error in our terminal for debugging
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 Server Error
  res.status(statusCode).json({
    message: err.message,
    // Only show the detailed error stack trace if we are NOT in production
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// --- NEW ESSENTIAL FEATURE: 404 Route Not Found ---
// If a user types an API URL that doesn't exist, this catches it
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// 7. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
