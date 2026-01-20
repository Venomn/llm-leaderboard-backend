import express from 'express';
import cors from 'cors';
import modlesRouter from './routes/modles';
import issuesRouter from './routes/issues';
// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/models', modlesRouter);
app.use('/api/issues', issuesRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});