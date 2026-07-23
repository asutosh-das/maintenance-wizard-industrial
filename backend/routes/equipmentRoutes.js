const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment'); // Import our Equipment model
const { protect } = require('../middleware/authMiddleware'); // Import our security guard!

// @route   GET /api/equipment
// @desc    Get all equipment (Read)
// Notice how we put 'protect' as the second argument. This means only logged-in users can run this code!
router.get('/', protect, async (req, res) => {
  try {
    // 1. Fetch all equipment from the database
    const equipment = await Equipment.find({});
    
    // 2. Send it back to the frontend
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/equipment
// @desc    Add new equipment (Create)
router.post('/', protect, async (req, res) => {
  try {
    const { name, tag, type, area, criticality, healthScore } = req.body;

    // 1. Create a new piece of equipment in the database using the provided data
    const newEquipment = await Equipment.create({
      name,
      tag,
      type,
      area,
      criticality,
      healthScore
    });

    // 2. Send back the newly created item with a 201 (Created) status code
    res.status(201).json(newEquipment);
  } catch (error) {
    // If something goes wrong (like a duplicate tag), send a 400 (Bad Request) error
    res.status(400).json({ message: 'Failed to add equipment', error: error.message });
  }
});

// @route   PUT /api/equipment/:id
// @desc    Update existing equipment (Update)
// The ':id' in the URL is a variable. E.g., /api/equipment/12345
router.put('/:id', protect, async (req, res) => {
  try {
    // 1. Try to find and update the equipment in one step
    // req.params.id gets the ID from the URL. req.body gets the new data.
    // { new: true } tells Mongoose to send back the updated version, not the old one.
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );

    if (updatedEquipment) {
      res.json(updatedEquipment);
    } else {
      res.status(404).json({ message: 'Equipment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update equipment', error: error.message });
  }
});

// @route   DELETE /api/equipment/:id
// @desc    Delete equipment (Delete)
router.delete('/:id', protect, async (req, res) => {
  try {
    // 1. Find the equipment and delete it
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);

    if (deletedEquipment) {
      res.json({ message: 'Equipment removed successfully' });
    } else {
      res.status(404).json({ message: 'Equipment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
