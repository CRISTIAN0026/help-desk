import { Schema, model } from 'mongoose';

const userSchema = new Schema({

  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user', 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

export default model('User', userSchema);

