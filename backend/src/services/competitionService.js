import Competition from '../models/Competition.js';

export const getAllCompetitions = () => Competition.find().sort({ updatedAt: -1 });

export const getCompetitionById = (id) => Competition.findOne({ id });