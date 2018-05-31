import React from 'react'
import {connect} from 'react-redux'
import {fetchBookings} from '../state/bookings/actions'
import {fetchRooms} from '../state/rooms/actions'
import {onSelectBooking} from '../state/currentBooking/actions'

import List from '../components/BookingList'

class BookingList extends React.Component {
  componentDidMount = () => this.loadBookingInformation()

  loadBookingInformation = () => {
    this.props.fetchRooms()
    this.props.fetchBookings()
  }

  onItemClick = bookingId => {
    this.props.onSelectBooking(bookingId)
    this.props.onItemClick()
  }

  render() {
    return <List {...this.props} onItemClick={this.onItemClick} />
  }
}

const mapStateToProps = state => ({
  bookings: state.bookings,
  rooms: state.rooms,
  search: state.search
})

const mapDispatchToProps = {
  fetchBookings,
  fetchRooms,
  onSelectBooking
}

const BookingListContainer = connect(mapStateToProps, mapDispatchToProps)(
  BookingList
)

export default BookingListContainer
