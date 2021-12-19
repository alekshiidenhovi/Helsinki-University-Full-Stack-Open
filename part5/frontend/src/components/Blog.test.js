import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog list tests', () => {
  let component

  beforeEach(() => {
    const blog = {
      author: 'Test author',
      title: 'Test title',
      url: 'www.test.com',
      likes: 4,
      user: {
        username: 'Testuser',
        name: 'Test User',
        id: '131221'
      }
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('Only title and author are displayed by default', () => {
    expect(component.container).toHaveTextContent('Test author')
    expect(component.container).toHaveTextContent('Test title')

    expect(component.container).not.toHaveTextContent('www.test.com')
    expect(component.container).not.toHaveTextContent('4')
  })
})