import bookingIds from '../../src/api/data/bookingIds.json'
import roomIds from '../../src/api/data/roomIds.json'
import bookings from '../../src/api/data/bookings.json'
import rooms from '../../src/api/data/rooms.json'
import * as API from '../../src/api/index'

describe('API', () => {
  describe('Room API', () => {
    let getRoomIdsResponse
    let getFirstRoomResponse
    let getRoomsResponse

    beforeAll(async () => {
      getRoomIdsResponse = await API.getRoomIds()
      getFirstRoomResponse = await API.getRoom(getRoomIdsResponse[0])
      getRoomsResponse = await API.getRooms()
    })

    test('getRoomIds should return an array of rooms', () => {
      expect(getRoomIdsResponse).toBe(roomIds)
    })

    test('getRoom should return some room data', () => {
      expect(getFirstRoomResponse).toBe(rooms[getRoomIdsResponse[0]])
    })

    test('getRoom should return an error when we request something that does not exists', async () => {
      expect.assertions(1)
      try {
        await API.getRoom('FIZZBUZZ')
      } catch (error) {
        expect(error).toMatchObject({statusCode: 404})
      }
    })

    test('getRooms should return all the rooms data', () => {
      expect(getRoomsResponse[0]).toBe(rooms[getRoomIdsResponse[0]])
    })
  })

  describe('Booking API', () => {
    let getBookingIdsResponse
    let getFirstBookingResponse
    let getBookingsAPIResponse

    beforeAll(async () => {
      getBookingIdsResponse = await API.getBookingIds()
      getFirstBookingResponse = await API.getBooking(getBookingIdsResponse[0])
      getBookingsAPIResponse = await API.getBookings()
    })

    test('getBookingIds should return an array of bookings', () => {
      expect(getBookingIdsResponse).toBe(bookingIds)
    })

    test('getBooking should return some booking data', () => {
      expect(getFirstBookingResponse).toBe(bookings[getBookingIdsResponse[0]])
    })

    test('getBooking should return an error when we request something that does not exists', async () => {
      expect.assertions(1)
      try {
        await API.getBooking('FIZZBUZZ')
      } catch (error) {
        expect(error).toMatchObject({statusCode: 404})
      }
    })

    test('getBookings should return all the bookings data', () => {
      expect(getBookingsAPIResponse[0]).toBe(bookings[getBookingIdsResponse[0]])
    })
  })
})
