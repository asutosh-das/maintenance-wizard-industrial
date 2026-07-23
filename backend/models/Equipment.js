const mongoose = require('mongoose');

// 1. Define the Equipment Blueprint
const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String, // E.g., 'P-102'
    required: true,
    unique: true,
  },
  type: {
    type: String, // E.g., 'Centrifugal Pump'
    required: true,
  },
  area: {
    type: String, // E.g., 'North Plant'
    required: true,
  },
  criticality: {
    type: String,
    enum: ['Safety-Critical', 'High', 'Medium', 'Low'], // Only allows these specific words
    required: true,
  },
  healthScore: {
    type: Number, // E.g., 85 (out of 100)
    default: 100,
  }
}, { 
  timestamps: true 
});

// 2. Export the Model
module.exports = mongoose.model('Equipment', equipmentSchema);
