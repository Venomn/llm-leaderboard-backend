import express from 'express';
import db from '../db';
import { uploadSingle } from '../middleware/upload';

const router = express.Router();

// POST /api/issues - Submit a new issue
router.post('/', uploadSingle, (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Get form data
    const { modelName, expectedBehavior } = req.body;

    // Validate required fields
    if (!modelName || !expectedBehavior) {
      return res.status(400).json({ error: 'Model name and expected behavior are required' });
    }

    // Save image path (relative to uploads folder)
    const imagePath = req.file.path;

    // Insert into database
    db.run(
      `INSERT INTO issues (modelName, imagePath, expectedBehavior) 
       VALUES (?, ?, ?)`,
      [modelName, imagePath, expectedBehavior],
      function(err) {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to save issue' });
        }

        // Success response
        res.status(201).json({
          message: 'Issue reported successfully',
          id: this.lastID
        });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;