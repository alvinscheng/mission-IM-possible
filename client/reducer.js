import { combineReducers } from 'redux'

function messages(state = [], action) {
  switch (action.type) {
    case 'SENT_MESSAGE':
      return [...state, { message: action.payload.message, username: action.payload.username }]
    default:
      return state
  }
}

function user(state = { username: '', token: '', isLoggedIn: false }, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return { username: action.payload.username, token: action.payload.token, isLoggedIn: true }
    default:
      return state
  }
}

function chatInput(state = '', action) {
  switch (action.type) {
    case 'TYPED_MESSAGE': return action.payload.message
    default: return state
  }
}

function components(state = [], action) {
  switch (action.type) {
    case 'DISPLAYED_SIGNUP': return [...state, 'SignupForm']
    default: return state
  }
}

const reducer = combineReducers({
  messages: messages,
  user: user,
  chatInput: chatInput,
  components: components
})

export default reducer
