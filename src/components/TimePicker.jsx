import React from 'react'
import {Field} from 'formik'
import TimePicker from 'rc-time-picker'
const FieldTimePicker = props => {
  return (
    <Field
      value={props.values[props.name]}
      name={props.name}
      render={() => (
        <TimePicker
          value={props.values[props.name]}
          allowEmpty={false}
          prefixCls="time-picker"
          onChange={props.onChange}
          showSecond={false}
          minuteStep={5}
          className="appOverridesTimePicker"
        />
      )}
    />
  )
}

export default FieldTimePicker
