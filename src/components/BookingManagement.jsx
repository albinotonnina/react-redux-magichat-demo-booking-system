import React from "react";
import * as API from '../api/index';
import _ from 'lodash';
import SearchBar from './SearchBar';
import BookingList from './BookingList';
import BookingEditor from './BookingEditor';

class BookingManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            bookings: [],
            rooms: [],
            selectedBookingId: null,
        };
        this.handleSelectBooking = this.handleSelectBooking.bind(this);
        this.loadBookingInformation = this.loadBookingInformation.bind(this);
    }

    loadBookingInformation() {
        API.getBookingIds()
            .then(bookingIds => {
                return Promise.all(_.map(bookingIds, API.getBooking));
            })
            .then(bookings => {
                this.setState({bookings});
                const roomIds = _.compact(_.uniq(_.map(bookings, 'roomId')));
                return Promise.all(_.map(roomIds, API.getRoom));
            })
            .then(rooms => {
                this.setState({rooms})
            });
    }

    componentDidMount() {
        this.loadBookingInformation();
    }

    handleSelectBooking(bookingId) {
        if (this.state.selectedBookingId === bookingId) {
            this.setState({
                selectedBookingId: undefined
            });
        } else {
            this.setState({
                selectedBookingId: bookingId
            });
        }
    }

    render() {
        const {keyword, bookings, rooms, selectedBookingId} = this.state;
        const booking = _.find(bookings, ({id}) => id === selectedBookingId);

        return (
            <div className='container'>
                <SearchBar keyword={keyword} />
                <div>
                    <button type="button" className="btn btn-secondary" onClick={this.loadBookingInformation}>
                        Refresh
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => alert('Not Implemented')}>
                        Create New Booking
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => alert('Not Implemented')}>
                        Cancel Selected Booking
                    </button>
                </div>
                <BookingList
                    bookings={bookings}
                    rooms={rooms}
                    onSelectBooking={this.handleSelectBooking}
                    selectedBookingId={selectedBookingId}
                />
                {_.isEmpty(booking) ? null : (
                    <BookingEditor
                        booking={booking}
                        rooms={rooms}
                    />
                )}
            </div>
        )
    }
}

export default BookingManagement;
