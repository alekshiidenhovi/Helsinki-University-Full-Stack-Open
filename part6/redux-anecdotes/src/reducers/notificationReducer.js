const initialNotification = 'This is the initial notification'

const notificationReducer = (state = initialNotification, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer