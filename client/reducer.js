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
    case 'LOGGED_OUT':
      return { username: '', token: '', isLoggedIn: false }
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
    case 'DISPLAYED_COMPONENT': return [...state, action.payload.component]
    case 'HID_COMPONENT':
      return state.filter(val => {
        return val !== action.payload.component
      })
    default: return state
  }
}

function userList(state = [], action) {
  switch (action.type) {
    case 'ADDED_USER': return action.payload.users
    case 'REMOVED_USER':
      return state.filter(user => {
        return user !== action.payload.user
      })
    default: return state
  }
}

function socket(state = {}, action) {
  switch (action.type) {
    case 'SOCKET_CONNECTED': return action.payload.socket
    default: return state
  }
}

const reducer = combineReducers({
  messages,
  user,
  chatInput,
  components,
  userList,
  socket
})

export default reducer
