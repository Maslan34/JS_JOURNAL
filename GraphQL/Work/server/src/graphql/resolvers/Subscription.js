import { pubsub } from '../../pubsub.js';
export const Subscription =
  // Subscription

  {
    userCreated: {
      subscribe: () => pubsub.asyncIterator("userCreated"),
    },
    eventCreated: {
      subscribe: () => pubsub.asyncIterator("eventCreated"),
    },
    eventDeleted: {
      subscribe: () => pubsub.asyncIterator("eventDeleted"),
    },
    participantAdded: {
      subscribe: () => pubsub.asyncIterator("participantAdded"),
    },
    eventCount: {
      subscribe: () => pubsub.asyncIterator(["eventsCount"]),
    },
  };

// Subscription
