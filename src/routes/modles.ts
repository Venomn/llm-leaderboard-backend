import express from 'express';
import db from '../db';

const router = express.Router();

// GET /api/models - Get leaderboard data
router.get('/', (req, res) => {
  try {
    // Query to count issues by modelName
    db.all(
      `SELECT 
        modelName as name, 
        COUNT(*) as countIssueReported 
       FROM issues 
       GROUP BY modelName 
       ORDER BY countIssueReported DESC`,
      [],
      (err, rows: any[]) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch data' });
        }

        // Return array of { name, countIssueReported }
        res.json(rows);
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;