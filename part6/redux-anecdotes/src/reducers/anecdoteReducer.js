import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)
// const sortArray = (arr) => arr.sort((a, b) => b.votes - a.votes)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = oldAnecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(oldAnecdote)
    dispatch({ 
      type: 'VOTE',
      data: updatedAnecdote
    })
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