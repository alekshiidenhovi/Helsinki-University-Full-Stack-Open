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

const displayMessage = (type, text) => {
  return { type, text }
}

const resetMessage = () => {
  return {
    type: 'RESET'
  }
}

export const showMessage = (type, text) => {
  return async dispatch => {
    if (type !== null) {
      dispatch(displayMessage(type, text))
      setTimeout(() => dispatch(resetMessage()), 5000)
    }
  }
}

export default messageReducer