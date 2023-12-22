import Conversations from '../models/Conversations.js';
import { PubSub } from 'graphql-subscriptions';
import User from '../models/User.js';
import Request from '../models/Request.js';
import  mongoose  from 'mongoose';

const pubsub = new PubSub();

const conversationResolver = {
  Query: {
    getConversations: async () => await Conversations.find(),

    getConversationsByRequestId: async (_, { requestId }) => {
      try {
        const conversations = await Conversations.find({ requestId }).populate('request admin messages.sender');
        return conversations;
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las conversaciones por requestId');
      }
    },
  },
  Mutation: {
    sendMessage: async (_, { conversationId, message, requestId, userId }, context) => {
      let conversation = await Conversations.findById(conversationId);
      let newMessage;
      const today = new Date();
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Bogota'
      };
      
      const formattedTime = new Intl.DateTimeFormat('es-CO', options).format(today);

      if (!conversation) {
        const sender = await User.findById(userId);
        const newConversation = new Conversations({
          messages: [{ text: message, sender: sender._id, date: formattedTime.toString() }],
          requestId
        });
        await newConversation.save();
        conversation = newConversation;
        newMessage = newConversation.messages[0];
        if (requestId) {
          const request = await Request.findById(requestId);
          conversation.request = request._id;
        }
      } else {
      
        const sender = await User.findById(userId);
        const _id = new mongoose.Types.ObjectId();
        newMessage = {_id, text: message, sender: sender._id, date: formattedTime.toString() };
        conversation.messages.push(newMessage);

        await conversation.save();
      }

      pubsub.publish('sendMessage', { sendMessage: newMessage, conversationId });
      return newMessage;
    },
  },
  Subscription: {
    sendMessage: {
      subscribe: (_, { conversationId }, { pubsub }) => {
        return pubsub.asyncIterator(`sendMessage_${conversationId}`);
      },
    },
  },
};

export default conversationResolver;

