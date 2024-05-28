import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.DB as string;

const connectionDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Connection Successful');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error('Unknown Error');
    }
  }
};

export default connectionDB