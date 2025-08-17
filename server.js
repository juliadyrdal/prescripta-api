// Import the app
import app from './src/app.js';
import dotenv from 'dotenv';

// Only load .env file locally
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
