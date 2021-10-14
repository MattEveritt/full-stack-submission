import { gql } from '@apollo/client'

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: String!, $author: String!, $genres: [String]!) {
    addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres,
    ) {
        title
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: String!) {
    editAuthor(
        name: $name,
        setBornTo: $born,
    ) {
        name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password,
    ) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
    }
  }
`

