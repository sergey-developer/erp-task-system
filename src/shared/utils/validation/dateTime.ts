import moment, { Moment } from 'moment-timezone'
import { FormInstance, NamePath, ValidatorRule } from 'rc-field-form/es/interface'

import { validationMessages } from 'shared/constants/validation'

export const dateValidator =
  ({ required }: { required?: boolean }): ValidatorRule['validator'] =>
  (rule, value: Moment) =>
    value
      ? value.isBefore(moment(), 'day')
        ? Promise.reject(validationMessages.date.canNotBeInPast)
        : Promise.resolve()
      : required
      ? Promise.reject(validationMessages.required)
      : Promise.resolve()

export const timeValidator =
  ({
    dateGetter,
    dateFieldName,
    required,
  }: {
    dateGetter: FormInstance['getFieldValue']
    dateFieldName: NamePath
    required: boolean
  }): ValidatorRule['validator'] =>
  (rule, value: Moment) => {
    if (required && !value) return Promise.reject(validationMessages.required)

    const date: Moment = dateGetter(dateFieldName)
    const currentDate = moment()

    if (!date || date.isAfter(currentDate, 'day')) {
      return Promise.resolve()
    }

    if (date.isSame(currentDate, 'day')) {
      return value.isBefore(currentDate, 'minute')
        ? Promise.reject(validationMessages.time.canNotBeInPast)
        : Promise.resolve()
    } else {
      return Promise.resolve()
    }
  }
