import Request from '../models/Request.js';
import User from '../models/User.js';

const requestResolver = {
    Query: {
      getRequests: async () => await Request.find(),
      getRequestsUser: async (_, { createdBy }) => {
        if (!createdBy) {
          throw new Error("User ID not provided");
        }
        const requests = await Request.find({ createdBy });
  
        return requests;
      },
    },
    Mutation: {
      createRequest: async (_, { date, state, queryType, description, userId }, context) => {
        const createdBy = await User.findById(userId);
        const { name } = await createdBy;
        userId = name
        const request = new Request({ date, state, queryType, description, userId, createdBy });
        await request.save();
        return request;
      },
      respondToRequest: async (_, { requestId, adminId, response }, context) => {
        const admin = await User.findById(adminId);
        const request = await Request.findById(requestId);
        request.state = 'responded';
        request.response = response;
        request.admin = admin;
        await request.save();
        return 'Request responded successfully';
      },
      updateRequestState: async (_, { requestId, adminId, newState }, { models }) => {
        const updatedRequest = await models.Request.findOneAndUpdate(
          { _id: requestId },
          { $set: { state: newState } },
          { new: true } 
        );
  
        return updatedRequest;
      },
    },
  };
  
  export default requestResolver;
  