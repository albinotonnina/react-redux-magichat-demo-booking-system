import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'formik'
import {DateRangePicker} from 'react-dates'

export default class FieldTimePicker extends React.Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    onDatesChange: PropTypes.func
  }

  state = {
    hasFocus: null
  }

  getPicker = () => {
    const {
      values: {startDate, endDate}
    } = this.props

    return (
      <DateRangePicker
        block
        hideKeyboardShortcutsPanel
        displayFormat="D MMM YYYY"
        startDate={startDate}
        startDateId="bookingStartDate"
        endDate={endDate}
        endDateId="bookingEndDate"
        onDatesChange={this.props.onDatesChange}
        focusedInput={this.state.hasFocus}
        onFocusChange={hasFocus => this.setState({hasFocus})}
        minimumNights={0}
        numberOfMonths={1}
      />
    )
  }

  render() {
    return <Field name="dataRange" render={this.getPicker} />
  }
}
