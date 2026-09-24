import cors from 'cors';
import express from 'express';
import competitionRoutes from './routes/competitionRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Feedants backend is running' });
});

app.use('/api/competition', competitionRoutes);
app.use(errorMiddleware);

export default app;