// pubsub.js

// Only a single instance of PubSub should be created.
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();