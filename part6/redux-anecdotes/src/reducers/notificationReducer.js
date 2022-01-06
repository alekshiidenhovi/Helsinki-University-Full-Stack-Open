let timeoutId

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW':
      return action.text
    case 'HIDE':
      return null
    default:
      return state
  }
}

export const newNotification = (text, seconds) => {
  return async dispatch => {
    clearTimeout(timeoutId)

    dispatch({ 
      type: 'SHOW',
      text
    })

    timeoutId = setTimeout(() => dispatch({ 
      type: 'HIDE'
    }), seconds * 1000)
  }
}

export default notificationReducer