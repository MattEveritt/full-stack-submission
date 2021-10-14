import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = (props) => {

  const [genreFilter, setGenreFilter] = useState('')
  const result = useQuery(ALL_BOOKS)
  if (!props.show || !result.data) {
    return null
  }

  const books = [...result.data.allBooks]
  const filteredBooks = genreFilter === ''
    ? books
    : books.filter(
        (b) => b.genres.some((g) => g === genreFilter)//.toLowerCase().indexOf(genreFilter.toLowerCase()) !== -1
      )
  console.log(filteredBooks)
  const allGenres = [...new Set(books.map((b) => b.genres).flat(1))]
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((g) => (
        <button
          key={g}
          onClick={() => {
            setGenreFilter(g)
          }}
        >
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
