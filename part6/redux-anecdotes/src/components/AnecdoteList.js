import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { newNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const { anecdotes, filter } = useSelector(state => state)

  const voting = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(newNotification(anecdote.content, 'voted'))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return (
    <div>
      {anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voting(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList