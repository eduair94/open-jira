import { Entry } from '@/interfaces';
import { Model, Schema, model, models } from 'mongoose';

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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const EntryModel: Model<IEntry> = models.Entry || model('Entry', entrySchema);

export default EntryModel;
