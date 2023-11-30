import mongoose from 'mongoose';

export const mongoClient = new mongoose.mongo.MongoClient(
  process.env.MONGO_URL as string,
  {},
).connect();
