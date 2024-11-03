import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import gql from "graphql-tag";
import { books, authors } from "./data.js";

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author_id: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    lastname: String
    books(filter: String): [Book]
  }

  type Query {
    bookQuery: [Book]
    bookQuerySinlge(id: ID!): Book
    authorQuery: [Author]
  }
`;

const resolvers = {
  Query: {
    bookQuery: () => books,
    bookQuerySinlge: (parent, args) => {
      const bookSingle = books.find((book) => book.id === args.id);
      //console.log(bookSingle)
      return bookSingle;
    },
    authorQuery: () => authors,
  },

  // İlişkiler (parent burada verinin kendisidir.)

  Book: {
    author: (parent, args) => {
      const author = authors.find((author) => author.id === parent.author_id);
      return author;
    },
  },

  Author: {
    books: (parent, args) => {
      let booksFetched;
      if (args.filter) {
        booksFetched = books.filter(
          (book) =>
            book.author_id === parent.id && book.title.startsWith(args.filter)
        );
      } else {
        booksFetched = books.filter((book) => book.author_id === parent.id);
      }
      return booksFetched
    },
  },
};

// İlişkiler (parent burada verinin kendisidir.)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀  Server ready at: ${url}`);
