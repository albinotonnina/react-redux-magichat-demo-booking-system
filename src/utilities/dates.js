import moment from 'moment'

export const getInitialTime = (date, offset) =>
  date
    ? moment(date)
    : moment()
        .add(offset, 'minutes')
        .startOf('hour')

export const mergeDates = (date, time) => {
  return date
    .clone()
    .hours(time.hours())
    .minutes(time.minutes())
}
