import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

const BookingList = (props) => {
    const {bookings, selectedBookingId, rooms, onSelectBooking} = props;

    if (_.isEmpty(bookings)) {
        return (
            <div>No data</div>
        );
    }

    return (
        <table className="table">
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
            {_.map(bookings, ({ id, description, contact, start, end, roomId }) => {
                const room = _.find(rooms, ({id}) => id === roomId);

                return (
                    <tr
                        key={id}
                        onClick={() => onSelectBooking(id)}
                    >
                        <th scope="row">{_.get(room, 'description')} ({roomId})</th>
                        <td>{moment(start).format('lll')}</td>
                        <td>{moment(end).format('lll')}</td>
                        <td>{contact}</td>
                        <td>{description}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};

BookingList.propTypes = {
    bookings: PropTypes.arrayOf(PropTypes.object),
    rooms: PropTypes.arrayOf(PropTypes.object),
    onSelectBooking: PropTypes.func,
    selectedBookingId: PropTypes.string,
};

export default BookingList;
