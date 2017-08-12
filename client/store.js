import { createStore } from 'redux'
import reducer from './reducer'

const token = (localStorage.getItem('mission-IM-possible-jwtToken') ? localStorage.getItem('mission-IM-possible-jwtToken') : '')
const username = (localStorage.getItem('mission-IM-possible-username') ? localStorage.getItem('mission-IM-possible-username') : '')
const isLoggedIn = !!token

const store = createStore(reducer, { user: { token, username, isLoggedIn } })

export default store
