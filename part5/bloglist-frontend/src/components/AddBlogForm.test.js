import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

test('sent correct details to event handler', () => {
  const createBlog = jest.fn()

  const component = render(<AddBlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'HowdyDo' },
  })
  fireEvent.change(author, {
    target: { value: 'Matthew' },
  })
  fireEvent.change(url, {
    target: { value: 'www.matthew.com' },
  })
  fireEvent.submit(form)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('HowdyDo')
  expect(createBlog.mock.calls[0][0].author).toBe('Matthew')
  expect(createBlog.mock.calls[0][0].url).toBe('www.matthew.com')
})
