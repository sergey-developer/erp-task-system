import moment, { Moment } from 'moment-timezone'
import { FormInstance, NamePath, ValidatorRule } from 'rc-field-form/es/interface'

import { validationMessages } from 'shared/constants/validation'

type DateValidatorArgs = Partial<{
  required: boolean
  canBeInPast: boolean
}>

export const dateValidator =
  ({ required, canBeInPast = false }: DateValidatorArgs): ValidatorRule['validator'] =>
  (rule, value: Moment) => {
    const currentDate = moment()

    return value
      ? !canBeInPast && value.isBefore(currentDate, 'day')
        ? Promise.reject(validationMessages.date.canNotBeInPast)
        : Promise.resolve()
      : required
      ? Promise.reject(validationMessages.required)
      : Promise.resolve()
  }

type TimeValidatorArgs = {
  dateGetter: FormInstance['getFieldValue']
  dateFieldName: NamePath
  required: boolean
  canBeInPast?: boolean
}

export const timeValidator =
  ({
    dateGetter,
    dateFieldName,
    required,
    canBeInPast = false,
  }: TimeValidatorArgs): ValidatorRule['validator'] =>
  (rule, value: Moment) => {
    if (required && !value) return Promise.reject(validationMessages.required)

    const date: Moment = dateGetter(dateFieldName)
    const currentDate = moment()

    if (!date || date.isAfter(currentDate, 'day')) {
      return Promise.resolve()
    }

    if (date.isSame(currentDate, 'day')) {
      return !canBeInPast && value.isBefore(currentDate, 'minute')
        ? Promise.reject(validationMessages.time.canNotBeInPast)
        : Promise.resolve()
    } else {
      return Promise.resolve()
    }
  }
