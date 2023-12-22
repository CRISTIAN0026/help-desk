import { Schema, model } from 'mongoose';


const conversationSchema = new Schema({
  messages: [
    {
      text: String,
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      date: String,
    },
  ],
  requestId: String,
  request: { type: Schema.Types.ObjectId, ref: 'Request' },
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Conversation', conversationSchema);

