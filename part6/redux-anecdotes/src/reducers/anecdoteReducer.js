import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)
const sortArray = (arr) => arr.sort((a, b) => b.votes - a.votes)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return sortArray(state)
  }
}

export const vote = id => {
  return { 
    type: 'VOTE', 
    data: { id }
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ 
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer