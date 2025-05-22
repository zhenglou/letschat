import mongoose from 'mongoose';
export async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/letschat';
    console.log(mongoURI);
    mongoose.connection.on('error', err => {
      console.error('MongoDB runtime error:', err);
    });

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to letschat');
    
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
}
