import {
  getAllCompetitions,
  getCompetitionById,
} from '../services/competitionService.js';

export const getCompetitions = async (req, res, next) => {
  try {
    const competitions = await getAllCompetitions();

    return res.json(competitions[0] || null);
  } catch (error) {
    return next(error);
  }
};

export const getCompetition = async (req, res, next) => {
  try {
    const competition = await getCompetitionById(req.params.id);

    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    return res.json(competition);
  } catch (error) {
    return next(error);
  }
};