import {SET_CURRENT_BOOKING, SET_IS_OVERLAPPING} from './actions'

const currentBooking = (state = {id: null, errors: {}}, action) => {
  switch (action.type) {
    case SET_CURRENT_BOOKING:
      return {...state, errors: {}, id: action.bookingId}
    case SET_IS_OVERLAPPING:
      return {...state, errors: {isOverlapping: action.value}}
    default:
      return state
  }
}

export default {
  currentBooking
}
