import React from 'react'
import PropTypes from 'prop-types'
import {debounce} from 'throttle-debounce'
import {ic_refresh, ic_add, ic_face} from 'react-icons-kit/md'

import {BarContainer, IcoButton} from '../ui/forms'

class SearchBar extends React.Component {
  static propTypes = {
    onSelectBooking: PropTypes.func.isRequired,
    onNewBookingClick: PropTypes.func.isRequired,
    onInfoClick: PropTypes.func.isRequired,
    fetchBookings: PropTypes.func.isRequired
  }

  onAddNewBooking = () => {
    this.props.onSelectBooking(null)
    this.props.onNewBookingClick()
  }

  onSearch = event => {
    this.debouchedSearch(event.target.value)
  }

  componentDidMount = () => {
    this.debouchedSearch = debounce(400, this.props.onSearch)
  }

  render() {
    return (
      <BarContainer>
        <IcoButton
          size={32}
          icon={ic_face}
          onClick={this.props.onInfoClick}
          title="~~~~"
        />
        <IcoButton
          size={32}
          icon={ic_refresh}
          onClick={this.props.fetchBookings}
          title="Refresh Booking List"
        />
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Filter bookings"
            onChange={this.onSearch}
          />
        </div>

        <IcoButton
          size={32}
          icon={ic_add}
          onClick={this.onAddNewBooking}
          title="Add new Booking"
        />
      </BarContainer>
    )
  }
}

export default SearchBar
