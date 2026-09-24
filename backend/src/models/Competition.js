import mongoose from 'mongoose';

const judgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false },
);

const importantDateSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const previousWinnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    award: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false },
);

const rewardSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false },
);

const referralSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    discountMessage: { type: String, required: true },
  },
  { _id: false },
);

const competitionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    registered: { type: Boolean, required: true },
    tags: [{ type: String }],
    prizePool: { type: Number, required: true },
    entryFee: { type: Number, required: true },
    spotsLeft: { type: Number, required: true },
    booked: { type: Number, required: true },
    totalSlots: { type: Number, required: true },
    judge: { type: judgeSchema, required: true },
    importantDates: [importantDateSchema],
    previousWinners: [previousWinnerSchema],
    description: { type: String, required: true },
    rewards: [rewardSchema],
    referral: { type: referralSchema, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (_document, returnedObject) => {
        delete returnedObject._id;
      },
    },
  },
);

const Competition = mongoose.model('Competition', competitionSchema);

export default Competition;