import moment, { Moment } from 'moment-timezone'
import { FormInstance, NamePath, ValidatorRule } from 'rc-field-form/es/interface'

import { validationMessages } from 'shared/constants/validation'
import { MaybeUndefined } from 'shared/types/utils'

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
  dateFieldPath: NamePath
  required: boolean
  canBeInPast?: boolean
}

export const timeValidator =
  ({
    dateGetter,
    dateFieldPath,
    required,
    canBeInPast = false,
  }: TimeValidatorArgs): ValidatorRule['validator'] =>
  (rule, value: Moment) => {
    if (required && !value) return Promise.reject(validationMessages.required)

    const currentDate = moment()
    const date: MaybeUndefined<Moment> = dateGetter(dateFieldPath)
    if (!date) {
      console.warn(
        'Time validation goes wrong because date value was not received in time validator because date field path is wrong or date value is falsy value',
      )
    }

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
