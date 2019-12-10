import { gql } from "apollo-boost";

// second step is to bind this query below to the component
// fist import 'graphql' and then bind it at the bottom of this page
// for queries, we don't need to put anythng before first {} braces
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

// for mutation first the 'mutation' name is needed
// second, from 'schema' file on the server side,
// mutation name needs to match here (addBook, addAuthor)
// export it down below
// and then import it into the addBook component where it will be used
const addBookMutation = gql`
  mutation ANYTHINGHERE($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

// export all the queries
// you have to export queries in order to import them in another file
export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
