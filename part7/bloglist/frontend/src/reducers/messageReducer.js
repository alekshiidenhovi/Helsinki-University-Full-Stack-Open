const initialState = { text: '', type: null }

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SUCCESS':
    return { text: action.text, type: 'success' }
  case 'FAILURE':
    return { text: action.text, type: 'failure' }
  case 'RESET':
    return initialState
  default:
    return state
  }
}

export const displayMessage = (type, text) => {
  return { type, text }
}

export const resetMessage = () => {
  return {
    type: 'RESET'
  }
}

export default messageReducer