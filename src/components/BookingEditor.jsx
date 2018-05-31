import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';

const BookingEditor = (props) => {
    const {booking, rooms} = props;
    const room = _.find(rooms, ({id}) => id === _.get(booking, 'roomId'));

    return (
        <div>
            <h3>This is the selected booking</h3>
            <pre><code>Booking: {JSON.stringify(booking)}</code></pre>
            <pre><code>Room: {JSON.stringify(room)}</code></pre>
        </div>
    )
};

BookingEditor.propTypes = {
    booking: PropTypes.object,
    rooms: PropTypes.arrayOf(PropTypes.object)
};

export default BookingEditor;
