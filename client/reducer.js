import { combineReducers } from 'redux'

function messages(state = [], action) {
  switch (action.type) {
    case 'SEND_MESSAGE': return [...state, action.payload.message]
    default: return state
  }
}

function isLoggedIn(state = false, action) {
  switch (action.type) {
    case 'LOG_IN':
      return true
    default:
      return state
  }
}

const reducer = combineReducers({
  messages: messages,
  isLoggedIn: isLoggedIn
})

export default reducer
