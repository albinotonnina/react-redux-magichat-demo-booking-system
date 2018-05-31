export const SET_IS_OVERLAPPING = 'currentBooking/overlapping'

export const SET_CURRENT_BOOKING = 'currentBooking/set'
export const onSelectBooking = bookingId => ({
  type: SET_CURRENT_BOOKING,
  bookingId
})
