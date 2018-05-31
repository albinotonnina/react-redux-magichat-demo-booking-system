import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class BookingList extends React.Component {
  static propTypes = {
    bookings: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
    search: PropTypes.string
  }

  render() {
    const {bookings, rooms, onItemClick, search} = this.props

    const filterBookingTexts = b =>
      ~`${b.roomId} ${b.contact} ${b.description}`.toLowerCase().indexOf(search)

    const filteredBookings = bookings.filter(filterBookingTexts)

    return filteredBookings.length > 0 ? (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Room</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Contact</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map(
            ({id, description, contact, start, end, roomId}) => {
              const room = rooms.find(({id}) => id === roomId)

              const startDate = moment(start)
              const endDate = moment(end)

              const formattedEndDate = endDate.format(
                endDate.diff(startDate, 'days') > 0 ? 'MMMM Do, HH:mm' : 'HH:mm'
              )

              return (
                <tr
                  key={id}
                  onClick={() => onItemClick(id)}
                  style={{cursor: 'pointer'}}
                >
                  <th scope="row">
                    {room.description} ({roomId})
                  </th>
                  <td>{startDate.format('MMMM Do, HH:mm')}</td>
                  <td>{formattedEndDate}</td>
                  <td>{contact}</td>
                  <td>{description}</td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    ) : (
      <div>No data</div>
    )
  }
}

export default BookingList
