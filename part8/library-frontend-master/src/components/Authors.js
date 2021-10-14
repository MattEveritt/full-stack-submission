import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from './queries'
import { useMutation, useQuery } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  if (!props.show || !result.data) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('update author... ')
    updateAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  const authors = [...result.data.allAuthors]
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <select onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default Authors
