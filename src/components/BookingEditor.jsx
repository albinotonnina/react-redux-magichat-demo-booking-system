import React from 'react'
import PropTypes from 'prop-types'
import {Formik, Field, Form} from 'formik'
import {
  ic_date_range,
  ic_group_work,
  ic_access_time,
  ic_face,
  ic_description,
  ic_done
} from 'react-icons-kit/md'

import {FormFieldWithIcon} from '../ui/forms'
import {getBookingObject, getInitialValues} from '../utilities/bookings'
import FieldTimePicker from './TimePicker'
import DateRangePicker from './DateRangePicker'

import {mergeDates} from '../utilities/dates'

class BookingEditor extends React.Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    bookings: PropTypes.array.isRequired,
    currentBooking: PropTypes.object.isRequired,
    onSaveBooking: PropTypes.func.isRequired
  }

  onSubmit = async (values, actions) => {
    actions.setStatus('')
    await this.props.onSaveBooking(getBookingObject(values))
    actions.setStatus('submitted')
  }

  validate = values => {
    let errors = {}

    if (!values.contact) {
      errors.contact = 'Required'
    }
    if (!values.startDate || !values.endDate) {
      errors.dates = 'Required'
    }
    if (!values.room || !values.room) {
      errors.room = 'Required'
    }

    return errors
  }

  render() {
    const {rooms, bookings, currentBooking} = this.props
    const booking = bookings.find(b => b.id === currentBooking.id)
    const initialValues = getInitialValues(booking, rooms)
    const {errors: bookingErrors = {}} = currentBooking

    return (
      <Formik
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validate={this.validate}
        onSubmit={this.onSubmit}
        render={formProps => {
          const {values, touched, errors, status} = formProps

          const formIsSubmitted =
            !bookingErrors.isOverlapping && status === 'submitted'
              ? 'valid'
              : ''

          const normalizeEndTime = (value, values) => {
            const start = mergeDates(values.startDate, value)
            const end = mergeDates(values.endDate, values.endTime)
            if (start > end) {
              formProps.setFieldValue('endTime', value)
            }
          }

          return (
            <Form autoComplete="off">
              <FormFieldWithIcon
                icon={ic_group_work}
                error={touched.room && errors.room ? 'error' : ''}
                valid={formIsSubmitted}
              >
                <Field
                  component="select"
                  name="room"
                  className="form-control form-control-lg"
                >
                  <option label="Room" />
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.description}
                    </option>
                  ))}
                </Field>
              </FormFieldWithIcon>

              <FormFieldWithIcon
                icon={ic_date_range}
                error={
                  bookingErrors.isOverlapping ||
                  (touched.startDate && errors.dates)
                    ? 'error'
                    : ''
                }
                valid={formIsSubmitted}
              >
                <Field
                  name="dataRange"
                  render={() => (
                    <DateRangePicker
                      values={values}
                      onDatesChange={({startDate, endDate}) => {
                        formProps.setFieldValue('endDate', endDate)
                        formProps.setFieldValue('startDate', startDate)
                      }}
                    />
                  )}
                />
              </FormFieldWithIcon>

              {(values.startDate || values.endDate) && (
                <FormFieldWithIcon
                  icon={ic_access_time}
                  valid={formIsSubmitted}
                >
                  {values.startDate && (
                    <FieldTimePicker
                      name="startTime"
                      values={formProps.values}
                      onChange={value => {
                        formProps.setFieldValue('startTime', value)
                        normalizeEndTime(value, formProps.values)
                      }}
                    />
                  )}
                  {values.endDate && (
                    <FieldTimePicker
                      name="endTime"
                      values={formProps.values}
                      onChange={value => {
                        formProps.setFieldValue('endTime', value)
                      }}
                    />
                  )}
                </FormFieldWithIcon>
              )}

              <FormFieldWithIcon
                icon={ic_face}
                valid={formIsSubmitted}
                error={touched.contact && errors.contact ? 'error' : ''}
              >
                <Field
                  name="contact"
                  placeholder="Contact"
                  className="form-control form-control-lg"
                  data-testid="contact-input"
                />
              </FormFieldWithIcon>

              <FormFieldWithIcon icon={ic_description} valid={formIsSubmitted}>
                <Field
                  name="description"
                  render={({field}) => (
                    <textarea
                      className="form-control form-control-lg"
                      {...field}
                      placeholder="Description"
                    />
                  )}
                />
              </FormFieldWithIcon>

              <FormFieldWithIcon
                icon={formIsSubmitted ? ic_done : null}
                valid={formIsSubmitted}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-testid="booking-submit"
                >
                  Submit
                </button>
              </FormFieldWithIcon>
            </Form>
          )
        }}
      />
    )
  }
}

export default BookingEditor
