const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const userLogin = user => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const userLogout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default userReducer