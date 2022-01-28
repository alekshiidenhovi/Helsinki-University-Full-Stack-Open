import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {
  test('Form event handler gets called with the right details', () => {
    const createBlog = jest.fn()

    const component = render(
      <CreateForm createBlog={createBlog} />
    )

    const titleText = 'New blog'
    const authorText = 'New author'
    const urlText = 'www.blog.com'

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: titleText } })
    fireEvent.change(author, { target: { value: authorText } })
    fireEvent.change(url, { target: { value: urlText } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(titleText)
    expect(createBlog.mock.calls[0][0].author).toBe(authorText)
    expect(createBlog.mock.calls[0][0].url).toBe(urlText)
  })
})