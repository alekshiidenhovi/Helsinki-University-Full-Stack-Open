const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW':
      return action.notification
    case 'HIDE':
      return null
    default:
      return state
  }
}

export const newNotification = (anecdote, act) => {
  return {
    type: 'SHOW',
    notification: `You ${act} "${anecdote}"`
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    notification: null
  }
}

export default notificationReducer