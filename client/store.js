import { createStore } from 'redux'
import reducer from './reducer'

const token = (localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : '')
const username = (localStorage.getItem('username') ? localStorage.getItem('username') : '')
const isLoggedIn = !!token

const store = createStore(reducer, { isLoggedIn: { token, username, isLoggedIn } })

export default store
