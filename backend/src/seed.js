import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDatabase from './config/db.js';
import Competition from './models/Competition.js';

dotenv.config();

const sampleCompetition = {
  id: 'classical-dance',
  title: 'Feedants Classical Dance',
  registered: true,
  tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
  prizePool: 1500,
  entryFee: 99,
  spotsLeft: 19,
  booked: 1,
  totalSlots: 20,
  judge: {
    name: 'Manju Dubey',
    role: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  importantDates: [
    { label: 'Register Before', date: '10 Aug 26', time: '11:50 PM', icon: 'calendar-check-outline' },
    { label: 'Submission Starts', date: '6 Aug 26', time: '04:00 AM', icon: 'file-upload-outline' },
    { label: 'Submission Ends', date: '30 Aug 26', time: '11:55 PM', icon: 'calendar-remove-outline' },
    { label: 'Result Date', date: '1 Sept 26', time: '11:50 PM', icon: 'trophy-outline' },
  ],
  previousWinners: [
    { name: 'Riya Shah', award: '1st Winner', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
    { name: 'Aarav Mehta', award: '1st Winner', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Neha Verma', award: '2nd Winner', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80' },
    { name: 'Ishita Chok', award: '3rd Winner', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  ],
  description:
    'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
  rewards: [
    { position: '1st Winner', amount: 550 },
    { position: '2nd Winner', amount: 300 },
    { position: '3rd Winner', amount: 240 },
    { position: '4th Winner', amount: 200 },
    { position: '5th Winner', amount: 130 },
    { position: '6th Winner', amount: 80 },
  ],
  referral: {
    code: 'https://feedants.com/r/referral123',
    discountMessage: 'You earn ₹10 for every signup',
  },
};

const seed = async () => {
  await connectDatabase();
  const competition = await Competition.findOneAndUpdate(
    { id: sampleCompetition.id },
    sampleCompetition,
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log(`Seeded competition: ${competition.id}`);
};

seed()
  .catch((error) => {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });