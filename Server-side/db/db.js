import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};
