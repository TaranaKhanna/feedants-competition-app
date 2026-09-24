import dotenv from 'dotenv';
import app from './src/app.js';
import connectDatabase from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Feedants backend is running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Unable to start the backend:', error.message);
  process.exit(1);
});
