import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const { anecdotes, filter } = useSelector(state => state)

  const voting = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(newNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes
      .sort((a,b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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