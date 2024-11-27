import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter, Router } from 'react-router-dom';
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';


// WebSocket link oluştur
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4002/graphql',
    connectionParams: {
      reconnect: true, // Otomatik yeniden bağlanma
    },
  })
);

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
