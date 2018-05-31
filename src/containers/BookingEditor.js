import {connect} from 'react-redux'
import {onSaveBooking} from '../state/bookings/actions'
import BookingEditor from '../components/BookingEditor'

const mapStateToProps = state => ({
  rooms: state.rooms,
  bookings: state.bookings,
  currentBooking: state.currentBooking
})

const mapDispatchToProps = {
  onSaveBooking
}

const BookingItemContainer = connect(mapStateToProps, mapDispatchToProps)(
  BookingEditor
)

export default BookingItemContainer
