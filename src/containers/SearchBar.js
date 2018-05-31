import {connect} from 'react-redux'
import {onSelectBooking} from '../state/currentBooking/actions'
import {fetchBookings} from '../state/bookings/actions'
import {onSearch} from '../state/search/actions'
import SearchBar from '../components/SearchBar'

const mapDispatchToProps = {
  fetchBookings,
  onSelectBooking,
  onSearch
}

const SearchBarContainer = connect(null, mapDispatchToProps)(SearchBar)

export default SearchBarContainer
