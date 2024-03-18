import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
      publisher: 'OReilly',
      tags: [1, 20, 16]
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
      publisher: 'Companhia das Letras',
      tags: [20, 16]
    },
  ];

const tags = [
  {
    id: 1,
    titulo: 'aventura'
  }
]

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  type Book {
    title: String
    author: String
    publisher: String
    tags: [Tag]
  }

  type Tag {
    id: ID!
    titulo: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook (title: String!, author: String!, publisher: String!) : Book
  }
`;
 
const resolvers = {
    Book : {
      tags: (parent) => {
        return tags.filter(tag => parent.tags.includes(tag.id))
      }
    },
    Query: {
      books: () => books,
    },
    Mutation: {
      createBook: (_, { title, author, publisher }) => {
        books.push({ title, author, publisher})
        return { title, author, publisher }
      }
    }
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);

