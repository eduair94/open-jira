import mongoose from 'mongoose';

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected === 1) {
    return;
  }
  if (mongoose.connections && mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('Use existing database connection');
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL as string);
  mongoConnection.isConnected = 1;
  console.log('Connected to MongoDB', process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (mongoConnection.isConnected === 1) return;
  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('Disconnected from MongoDB');
};
