import _ from 'lodash'
import roomIds from './data/roomIds.json'
import rooms from './data/rooms.json'
import bookingIds from './data/bookingIds.json'
import bookings from './data/bookings.json'
import {delayedPromise, failedPromise} from './common'
import uuid from 'uuid'
import Moment from 'moment'
import {extendMoment} from 'moment-range'

const moment = extendMoment(Moment)

export const getRoomIds = () => {
  // console.log(`getRoomIds()`)
  return delayedPromise(roomIds)
}

export const getRoom = roomId => {
  // console.log(`getRoom(${roomId})`)
  const room = _.get(rooms, roomId)
  if (_.isNil(room)) {
    return failedPromise(404, 'Not Found', `Room ${roomId} is Not Found`)
  } else {
    return delayedPromise(room)
  }
}

export const getRooms = async () => {
  try {
    const roomIds = await getRoomIds()
    const rooms = roomIds.map(async room => await getRoom(room))
    return Promise.all(rooms)
  } catch (error) {
    return failedPromise(400, 'Error', error)
  }
}

export const getBookingIds = () => {
  // console.log(`getBookingIds()`)
  // console.log(`bookingIds = ${JSON.stringify(bookingIds)}`)
  return delayedPromise(bookingIds)
}

export const getBooking = bookingId => {
  // console.log(`getBooking(${bookingId})`)
  const booking = _.get(bookings, bookingId)
  if (_.isNil(booking)) {
    return failedPromise(404, 'Not Found', `Booking ${bookingId} is Not Found`)
  } else {
    return delayedPromise(booking)
  }
}

export const getBookings = async () => {
  try {
    const bookingIds = await getBookingIds()
    const _bookings = bookingIds.map(async booking => await getBooking(booking))
    return Promise.all(_bookings)
  } catch (error) {
    return failedPromise(400, 'Error', error)
  }
}

/*
The following would be a possible API to perform a search on a server
*/
// export const filterBookings = async query => {
//   try {
//     const allBookings = await getBookings()

//     const filterBookingTexts = booking => {
//       const {roomId, contact, description} = booking
//       const bookingText = `${roomId} ${contact} ${description}`
//       return ~bookingText.toLowerCase().indexOf(query)
//     }

//     return query ? allBookings.filter(filterBookingTexts) : allBookings
//   } catch (error) {
//     return failedPromise(400, 'Error', error)
//   }
// }

export const cancelBooking = bookingId => {
  // console.log(`cancelBooking(${bookingId})`)
  return delayedPromise(() => {
    const booking = _.get(bookings, bookingId)
    if (_.isNil(booking)) {
      return failedPromise(
        404,
        'Not Found',
        `Booking ${bookingId} is Not Found`
      )
    } else {
      _.unset(bookings, bookingId)
      _.remove(bookingIds, bookingId)
      return delayedPromise(bookingId)
    }
  })
}

export const isOverlapping = async booking => {
  const allBookings = await getBookings()
  const filterCurrentIfExists = b => b.id !== booking.id
  const filterOtherRooms = b => booking.roomId === b.roomId
  const filterOverlappingBookings = b =>
    moment
      .range(b.start, b.end)
      .overlaps(moment.range(booking.start, booking.end))

  return (
    allBookings
      .filter(filterCurrentIfExists)
      .filter(filterOtherRooms)
      .filter(filterOverlappingBookings).length > 0
  )
}

export const setBooking = async booking => {
  const {id = uuid(), description, contact, roomId, start, end} = booking || {}
  const hasOverlappingBookings = await isOverlapping(booking)

  if (hasOverlappingBookings) {
    return failedPromise(400, 'Bad data', `Overlapping bookings`)
  } else {
    const newBooking = {id, description, contact, roomId, start, end}

    _.set(bookings, id, newBooking)
    _.union(bookingIds, id)

    return delayedPromise(newBooking)
  }
}
