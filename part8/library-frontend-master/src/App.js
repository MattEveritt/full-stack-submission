import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import { ALL_BOOKS, BOOK_ADDED } from './components/queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    console.log('whatsup1')
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id) 

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (includedIn(dataInStore.allBooks, addedBook)) {
      console.log('whatsup2')
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  
  const logout = () => {
    setPage('authors')
    setToken(null)
    setLoggedIn(false)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const userToken = localStorage.getItem('user-token')
    if(userToken) {
      setToken(userToken)
    }
  }, [])

  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      {token ? <button onClick={() => setPage('add')}>add book</button> : null}
      {token ? <button onClick={() => setPage('recommend')}>recommend</button> : null}
      {token ? null : <button onClick={() => setPage('login')}>login</button>}
      {token ? <button onClick={() => logout()}>logout</button> : null}


      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} setLoggedIn={setLoggedIn}/>

      <Recommend show={page === 'recommend'} loggedIn={loggedIn}/>


    </div>
  )
}

export default App
