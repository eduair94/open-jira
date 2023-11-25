import mongoose, { ConnectionStates } from 'mongoose';

const mongoConnection = {
  isConnected: ConnectionStates.disconnected,
};

export const connect = async () => {
  if (mongoConnection.isConnected === ConnectionStates.connected) {
    console.log('Already connected to MongoDB');
    return;
  }
  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === ConnectionStates.connected) {
      console.log('Use existing database connection');
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL as string);
  mongoConnection.isConnected = ConnectionStates.connected;
  console.log('Connected to MongoDB', process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (mongoConnection.isConnected === ConnectionStates.connected) return;
  await mongoose.disconnect();
  mongoConnection.isConnected = ConnectionStates.disconnected;
  console.log('Disconnected from MongoDB');
};
