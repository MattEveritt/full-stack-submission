const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'HOWDY'

const MONGODB_URI =
  'mongodb+srv://mattheweveritt:scooby900410@cluster0.o632d.mongodb.net/graphql?retryWrites=true&w=majority'

console.log('connecting to ', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('debug', true)

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }

  type User {
    username: String
    favoriteGenre: String
    id: ID
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: String!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name: String, setBornTo: String): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => {
      const allBooks = await Book.find({})
      return allBooks.length
    },
    authorCount: async () => {
      const allAuthors = await Author.find({})
      return allAuthors.length
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const filteredBooks = books
          .filter((b) => b.author === args.author)
          .filter((b) => {
            for (i = 0; i < b.genres.length; i++) {
              if (b.genres[i] === args.genre) {
                return b
              }
            }
          })
        return filteredBooks
      } else if (!args.author && args.genre) {
        return books.filter((b) => {
          for (i = 0; i < b.genres.length; i++) {
            if (b.genres[i] === args.genre) {
              return b
            }
          }
        })
      } else if (args.author && !args.genre) {
        return books.filter((b) => b.author === args.author)
      } else {
        const books = await Book.find({}).populate('author')
        return books
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      const newAuthors = authors.map(
        (a) =>
          (a = {
            ...a.toObject(),
            bookCount: books.filter((book) => book.author.id === a.id).length,
          })
      )
      return newAuthors
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const newAuthor = new Author({ name: args.author })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author
      try {
        author = await newAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      const book = new Book({ ...args, author: author.id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const newBook = await Book.findOne({ title: args.title }).populate(
        'author'
      )

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (author) {
        author.born = args.setBornTo
        try {
          return author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        return null
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'HOWDY') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
