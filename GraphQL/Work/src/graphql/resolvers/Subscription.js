import { PubSub } from 'graphql-subscriptions'; 
const pubsub = new PubSub();
export const Subscription =
  // Subscription

  {
    userCreated: {
      subscribe: () => pubsub.asyncIterator("userCreated"),
    },
    eventCreated: {
      subscribe: () => pubsub.asyncIterator("eventCreated"),
    },
    participantAdded: {
      subscribe: () => pubsub.asyncIterator("participantAdded"),
    },
  };

// Subscription
