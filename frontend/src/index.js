import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});


const domain = process.env.APP_AUTH0_DOMAIN
const clientId = process.env.AUTH0_CLIENT_ID

console.log(domain, clientId)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Auth0Provider 
    domain={domain} 
    clientId={clientId} 
    authorizationParams={{ redirect_uri: window.location.origin }}>
    <App />
    </Auth0Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
