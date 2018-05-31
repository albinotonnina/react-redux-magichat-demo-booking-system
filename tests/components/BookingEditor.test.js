import 'react-dates/initialize'
import React from 'react'
import {render, Simulate} from 'react-testing-library'
import 'dom-testing-library/extend-expect'
import * as API from '../../src/api/index'
import BookingEditor from '../../src/components/BookingEditor'

describe('BookingEditor (Sample tests)', () => {
  it('should match the snapshot', async () => {
    const rooms = await API.getRooms()
    const bookings = await API.getBookings()

    const props = {
      rooms,
      bookings,
      currentBooking: {},
      onSaveBooking: jest.fn
    }

    const {container} = render(<BookingEditor {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should load the booking data in the Booking form', async () => {
    const rooms = await API.getRooms()
    const bookings = await API.getBookings()

    const props = {
      rooms,
      bookings,
      currentBooking: {id: bookings[0].id},
      onSaveBooking: jest.fn
    }

    const {getByTestId} = render(<BookingEditor {...props} />)
    const contactInput = getByTestId('contact-input')

    expect(contactInput.value).toEqual(bookings[0].contact)
  })

  it('should submit the form and we naively test that now', async () => {
    const rooms = await API.getRooms()
    const bookings = await API.getBookings()
    const onSaveBooking = jest.fn()
    const props = {
      rooms,
      bookings,
      currentBooking: {id: bookings[0].id},
      onSaveBooking
    }

    const {container} = render(<BookingEditor {...props} />)

    Simulate.submit(container.querySelector('form'))

    expect(onSaveBooking).toHaveBeenCalled()
  })
})
