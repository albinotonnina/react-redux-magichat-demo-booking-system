import _ from 'lodash';
import roomIds from './data/roomIds.json';
import rooms from './data/rooms.json';
import bookingIds from './data/bookingIds.json';
import bookings from './data/bookings.json';
import { delayedPromise, failedPromise } from './common';
import uuid from 'uuid';

export const getRoomIds = () => {
    console.log(`getRoomIds()`);
    return delayedPromise(roomIds);
};

export const getRoom = (roomId) => {
    console.log(`getRoom(${roomId})`);
    const room = _.get(rooms, roomId);
    if (_.isNil(room)) {
        return failedPromise(404, 'Not Found', `Room ${roomId} is Not Found`)
    } else {
        return delayedPromise(room);
    }
};

export const getBookingIds = () => {
    console.log(`getBookingIds()`);
    console.log(`bookingIds = ${JSON.stringify(bookingIds)}`)
    return delayedPromise(bookingIds);
};

export const getBooking = (bookingId) => {
    console.log(`getBooking(${bookingId})`);
    const booking = _.get(bookings, bookingId);
    if (_.isNil(booking)) {
        return failedPromise(404, 'Not Found', `Booking ${bookingId} is Not Found`)
    } else {
        return delayedPromise(booking);
    }
};

export const cancelBooking = (bookingId) => {
    console.log(`cancelBooking(${bookingId})`);
    return delayedPromise(() => {
        const booking = _.get(bookings, bookingId);
        if (_.isNil(booking)) {
            return failedPromise(404, 'Not Found', `Booking ${bookingId} is Not Found`)
        } else {
            _.unset(bookings, bookingId);
            _.remove(bookingIds, bookingId);
            return delayedPromise(bookingId);
        }
    });
};

export const createBooking = ( booking ) => {
    console.log(`createBooking(${JSON.stringify(booking)})`);
    const { id = uuid(), description, contact, roomId, start, end } = booking || {};
    delayedPromise(() => {
        const booking = { id, description, contact, roomId, start, end };
        _.set(bookings, id, booking);
        _.push(bookingIds, id);
        return booking;
    });
};
