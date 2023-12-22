import User from '../models/User.js';
import pkg from 'jsonwebtoken';
import  mongoose  from 'mongoose';
import 'dotenv/config';

const userResolver = {
  Query: {
    getUser: async (_, { email }) => {
      const existingUser = await User.findOne({ email });
      return existingUser
    }
  },
  Mutation: {
    register: async (_, { name, lastName, email, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const user = new User({ name, lastName, email, role });
      if (!user._id) {
        user._id = new mongoose.Types.ObjectId();
      }
      await user.save();
      const existUser = await User.findOne({ email });
      return existUser
    },
  },
};

export default userResolver;
