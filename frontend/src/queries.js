import { gql } from '@apollo/client';

export const GET_CONVERSATIONS = gql`
  query GetConversations {
    getConversations {
      _id
      messages {
        _id
        text
        date
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $role: String!) {
    register(name: $name, email: $email, role: $role){
      name
      email
      role
    }
  }
`;

export const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      _id
      name
      email
      role
    }
  }
`;

export const CREATE_REQUEST = gql`
  mutation CreateRequest($date: String!, $state: String!, $queryType: String!, $description: String!, $userId: String!) {
    createRequest(date: $date, state: $state, queryType: $queryType, description: $description, userId: $userId) {
      _id
      date
      state
      queryType
      userId
      description
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: String!, $message: String!,  $requestId: String!, $userId: String!) {
    sendMessage(conversationId: $conversationId, message: $message, requestId: $requestId, userId: $userId) {
      _id
    }
  }
`;

export const RESPOND_TO_REQUEST = gql`
  mutation RespondToRequest($requestId: ID!, $adminId: ID!, $response: String!) {
    respondToRequest(requestId: $requestId, adminId: $adminId, response: $response)
  }
`;


export const GET_REQUESTS = gql`
  query {
    getRequests {
      _id
      date
      state
      queryType
      description
      userId
    }
  }
`;

export const GET_CONVERSATIONS_BY_REQUEST_ID = gql`
  query GetConversationsByRequestId($requestId: String!) {
    getConversationsByRequestId(requestId: $requestId) {
      _id
      messages {
        _id
        text
        date
        sender {
          _id
        }
      }
      requestId
    }
  }
`;

export const SEND_MESSAGE_SUBSCRIPTION = gql`
  subscription SendMessage {
    sendMessage {
      _id
      text
      sender {
        _id
      }
      createdAt
    }
  }
`;

export const GET_REQUESTS_USER = gql`
  query GetRequestsUser($createdBy: String!) {
    getRequestsUser(createdBy: $createdBy) {
      _id
      date
      state
      queryType
      description
      userId
    }
  }
`;