import {ADD_BOOKING, RECEIVE_BOOKINGS} from './actions'

const bookings = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOOKINGS:
      return action.bookings
    case ADD_BOOKING: {
      const isEditing = state.find(booking => booking.id === action.booking.id)

      const replaceBooking = booking =>
        action.booking.id === booking.id ? action.booking : booking

      return isEditing ? state.map(replaceBooking) : [action.booking, ...state]
    }
    default:
      return state
  }
}

export default {
  bookings
}
