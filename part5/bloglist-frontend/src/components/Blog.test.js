import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  beforeEach(() => {})

  test('Likes and Url are not shown by default', () => {
    const user = {
      name: 'Matt',
    }
    const blog = {
      user: {
        name: 'Matt',
      },
      title: 'HowdyYo',
      author: 'Howdy',
      url: 'www.howdy.com',
    }
    const component = render(<Blog blog={blog} user={user} />)
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('Likes and url are shown after view button is clicked', () => {
    const user = {
      name: 'Matt',
    }
    const blog = {
      user: {
        name: 'Matt',
      },
      title: 'HowdyYo',
      author: 'Howdy',
      url: 'www.howdy.com',
    }
    const component = render(<Blog blog={blog} user={user} />)
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like button twice calls event handler twice', () => {
    const user = {
      name: 'Matt',
    }
    const blog = {
      user: {
        name: 'Matt',
      },
      title: 'HowdyYo',
      author: 'Howdy',
      url: 'www.howdy.com',
    }
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} updatedBlog={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
