import type { PickerTimeProps } from 'antd/es/date-picker/generatePicker'
import type { Moment } from 'moment'
import React from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import DatePicker from './DatePicker'

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => (
  <DatePicker
    {...props}
    picker='time'
    mode={undefined}
    ref={ref}
    placeholder='Время'
    format={TIME_PICKER_FORMAT}
  />
))

TimePicker.displayName = 'TimePicker'

export default TimePicker
