// server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    book(id: Int!): Book
    books(author: String): [Book]
    booksByYear(publicationYear: Int): [Book]
  }

  type Book {
    id: Int
    title: String
    author: String
    publicationYear: Int
  }
`);
const booksData = [
  {
    id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publicationYear: 1925
  },
  {
    id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publicationYear: 1960
  },
  {
    id: 3, title: '1984', author: 'George Orwell', publicationYear: 1949
  },
  {
    id: 4, title: 'Fire and Blood', author: 'George R.R. Martin', publicationYear: 2018
  },
  {
    id: 5, title: 'A Knight of the Seven Kingdoms', author: 'George R.R. Martin', publicationYear: 2015
  },
  {
    id: 6, title: 'A Game of Thrones', author: 'George R.R. Martin', publicationYear: 1996
  },
  {
    id: 7, title: 'A Clash of Kings', author: 'George R.R. Martin', publicationYear: 1998
  },
  {
    id: 8, title: 'A Storm of Swords', author: 'George R.R. Martin', publicationYear: 2000
  },
  {
    id: 9, title: 'A Feast for Crows', author: 'George R.R. Martin', publicationYear: 2005
  },
  {
    id: 10, title: 'A Dance with Dragons', author: 'George R.R. Martin', publicationYear: 2011
  },
  {
    id: 11, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', publicationYear: 1997
  },
  {
    id: 12, title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', publicationYear: 1998
  },
  {
    id: 13, title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', publicationYear: 1999
  },
  {
    id: 14, title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', publicationYear: 2000
  },
  {
    id: 15, title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', publicationYear: 2003
  },
  {
    id: 16, title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', publicationYear: 2005
  },
  {
    id: 17, title: 'Harry Potter and the Deathly Hallows', author: 'J.K. Rowling', publicationYear: 2007
  },
  {
    id: 18, title: 'The Hobbit', author: 'J.R.R. Tolkien', publicationYear: 1937
  },
  {
    id: 19, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', publicationYear: 1954
  },
  {
    id: 20, title: 'The Silmarillion', author: 'J.R.R. Tolkien', publicationYear: 1977
  }
];
// Define resolver functions
const root = {
  book: ({ id }) => booksData.find(book => book.id === id),
  books: ({ author }) => author ? booksData.filter(book => book.author === author) : booksData,
  booksByYear: ({ publicationYear }) => publicationYear ? booksData.filter(book => book.publicationYear === publicationYear) : booksData
};

// Create an Express application
const app = express();

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Enable GraphiQL for testing the API in the browser
}));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`GraphQL server is running on http://localhost:${PORT}/graphql`);
});
