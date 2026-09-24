import mongoose from 'mongoose';

const connectDatabase = async () => {
	const { MONGODB_URI } = process.env;

	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI is not configured');
	}

	try {
		await mongoose.connect(MONGODB_URI);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error.message);
		throw error;
	}
};

export default connectDatabase;
