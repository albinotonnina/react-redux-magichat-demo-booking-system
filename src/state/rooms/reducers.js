import {RECEIVE_ROOMS} from './actions'

const rooms = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ROOMS:
      return action.rooms
    default:
      return state
  }
}

export default {
  rooms
}
