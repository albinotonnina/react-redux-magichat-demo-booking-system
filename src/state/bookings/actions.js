import * as API from '../../api/index'
import {
  SET_IS_OVERLAPPING,
  SET_CURRENT_BOOKING
} from '../currentBooking/actions'

export const RECEIVE_BOOKINGS = 'bookings/receive'
export const fetchBookings = () => async dispatch => {
  try {
    const bookings = await API.getBookings()
    dispatch({type: RECEIVE_BOOKINGS, bookings})
  } catch (e) {
    dispatch({type: 'error', name: 'error', value: e.message})
  }
}

export const ADD_BOOKING = 'bookings/add'
export const onSaveBooking = booking => async dispatch => {
  try {
    const isOverlapping = await API.isOverlapping(booking)

    if (isOverlapping) {
      dispatch({type: SET_IS_OVERLAPPING, value: true})
    } else {
      const newBooking = await API.setBooking(booking)
      dispatch({type: ADD_BOOKING, booking: newBooking})
      dispatch({type: SET_CURRENT_BOOKING, bookingId: newBooking.id})
    }
  } catch (e) {
    dispatch({type: 'error', name: 'error', value: e.message})
  }
}
