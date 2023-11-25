import { Entry } from '@/interfaces';
import mongoose, { Model, Schema } from 'mongoose';

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  status: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} is not a supported status',
    },
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
