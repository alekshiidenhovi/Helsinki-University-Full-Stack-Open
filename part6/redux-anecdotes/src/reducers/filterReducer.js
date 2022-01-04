const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE':
      return action.content
    default:
      return state
  }
}

export const updateFilter = filter => {
  return {
    type: 'UPDATE',
    content: filter
  }
}

export default filterReducer