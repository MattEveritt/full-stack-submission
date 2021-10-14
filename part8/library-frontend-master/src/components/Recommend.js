import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'

const Recommend = (props) => {
  const [getUser, result] = useLazyQuery(ME)
  const bookResult = useQuery(ALL_BOOKS)
  useEffect(() => {
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loggedIn]) 
  if (!props.show) {
    return null
  }

  const books = [...bookResult.data.allBooks]
  console.log('books ', books)
  const filteredBooks = books.filter(
      (b) => b.genres.some((g) => g === result.data.me.favoriteGenre)
    )
  console.log('user ', filteredBooks[0])
  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre patterns
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
