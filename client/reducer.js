export default function reducer(state = [], action) {
  switch (action.type) {
    case 'SEND_MESSAGE': return [...state, action.payload.message]
    default: return state
  }
}
