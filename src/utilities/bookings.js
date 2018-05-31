import moment from 'moment'
import {getInitialTime, mergeDates} from './dates'

export const getBookingObject = values => ({
  id: values.id,
  start: mergeDates(values.startDate, values.startTime),
  end: mergeDates(values.endDate, values.endTime),
  description: values.description,
  contact: values.contact,
  roomId: values.room
})

export const getInitialValues = (cb = {}, rooms) => {
  return {
    id: cb.id,
    contact: cb.contact || '',
    description: cb.description || '',
    startDate: cb.start ? moment(cb.start) : null,
    endDate: cb.start ? moment(cb.end) : null,
    room: rooms.map(item => item.id).find(id => cb && id === cb.roomId) || '',
    startTime: getInitialTime(cb.start, 30),
    endTime: getInitialTime(cb.end, 90)
  }
}
