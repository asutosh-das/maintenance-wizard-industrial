const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { protect } = require('../middleware/authMiddleware'); // Still protect our AI route!

// 1. Initialize the Google Gemini API using the key from our .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST /api/ai/chat
// @desc    Send a message to the Gemini AI Assistant
router.post('/chat', protect, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Please provide a prompt for the AI' });
    }

    // 2. Select the specific Gemini model we want to use (using the latest stable flash model)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // 3. Give the AI some context so it acts like our Maintenance Assistant
    const systemPrompt = `You are the Maintenance Wizard AI Assistant. You help industrial technicians and engineers analyze equipment data, review maintenance logs, and spot anomalies. Keep your answers concise, professional, and helpful. The user says: ${prompt}`;

    // 4. Send the prompt to Gemini and wait for the response
    const result = await model.generateContent(systemPrompt);
    const aiResponse = await result.response.text();

    // 5. Send the AI's response back to the frontend
    res.json({ reply: aiResponse });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ message: 'Failed to generate AI response', error: error.message });
  }
});

module.exports = router;
