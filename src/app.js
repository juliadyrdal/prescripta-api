/**
 * API Status Policy
 * -----------------
 * - 200: success (empty array OK for collection endpoints)
 * - 400: invalid or missing request parameters
 * - 404: single-resource lookup not found
 * - 500: unexpected errors (via asyncHandler → central error middleware)
 */

import express from 'express';
import helmet from 'helmet'
import compression from 'compression'

// Import routes
import chapterRouter from './routes/chapters.js'
import sectionRouter from './routes/sections.js'
import paragraphRouter from './routes/paragraphs.js'
import substanceRouter from './routes/substances.js'

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); 

// Only enable security and performance middleware in production
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())        // secure headers
  app.use(compression())   // gzip responses
}

// Mount routers
app.use('/api/chapters', chapterRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/paragraphs', paragraphRouter);
app.use('/api/substances', substanceRouter);

// Middleware for error handling - keep last in stack
app.use((err, req, res, next) => {
    // Log error for debugging
    console.error(err)
    res.status(500).json({ error: 'Internal server error'})
})

export default app;
