import { combineReducers } from 'redux'

function messages(state = [], action) {
  switch (action.type) {
    case 'SENT_MESSAGE': return [...state, action.payload.message]
    default: return state
  }
}

function isLoggedIn(state = { username: '', token: '', isLoggedIn: false }, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return { username: action.payload.username, token: action.payload.token, isLoggedIn: true }
    default:
      return state
  }
}

const reducer = combineReducers({
  messages: messages,
  isLoggedIn: isLoggedIn
})

export default reducer
