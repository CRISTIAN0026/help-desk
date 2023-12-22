import { Schema, model } from 'mongoose';

const requestSchema = new Schema({
  date: String,
  state: String,
  queryType: String,
  description: String,
  userId: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Request', requestSchema);
