import express from 'express';
import {
  getCompetition,
  getCompetitions,
} from '../controllers/competitionController.js';

const router = express.Router();

router.get('/', getCompetitions);
router.get('/:id', getCompetition);

export default router; 