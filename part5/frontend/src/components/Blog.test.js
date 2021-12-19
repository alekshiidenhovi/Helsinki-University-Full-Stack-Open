import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog list tests', () => {
  let user
  let blog

  beforeEach(() => {
    user = {
      username: 'Testuser',
      name: 'Test User',
      id: '131221'
    }

    blog = {
      author: 'Test author',
      title: 'Test title',
      url: 'www.test.com',
      likes: 4,
      user
    }
  })

  test('Only title and author are displayed by default', () => {
    const component = render(
      <Blog blog={blog} currentUser={user} />
    )

    expect(component.container).toHaveTextContent('Test author')
    expect(component.container).toHaveTextContent('Test title')

    expect(component.container).not.toHaveTextContent('www.test.com')
    expect(component.container).not.toHaveTextContent('4')
  })

  test('Show button reveals extra information', () => {
    const component = render(
      <Blog blog={blog} currentUser={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.test.com')
    expect(component.container).toHaveTextContent('4')
  })

  test('Like button is clicked twice and the clicks are registered', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} currentUser={user} updateBlog={mockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})