const initialState = {
  statusFilter: 'all',
  stories: 'AAAA'
}

const reducer = function(state=initialState, action) {
  switch(action.type) {

    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload }

    case 'SET_SPRINT_FILTER':
      return { ...state, sprintFilter: action.payload }

    default:
      return state
  }
}

export default reducer
