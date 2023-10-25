import { Moment } from 'moment-timezone'
import { FormInstance, NamePath, ValidatorRule } from 'rc-field-form/es/interface'

import { validationMessages } from 'shared/constants/validation'

export const dateValidator: ValidatorRule['validator'] = (rule, value: Moment) =>
  value
    ? value.isBefore(new Date(), 'day')
      ? Promise.reject(new Error(validationMessages.date.canNotBeInPast))
      : Promise.resolve()
    : Promise.reject(validationMessages.required)

export const timeValidator =
  (valueGetter: FormInstance['getFieldValue'], fieldName: NamePath): ValidatorRule['validator'] =>
  (rule, value: Moment) => {
    if (!value) return Promise.reject(validationMessages.required)

    const date: Moment = valueGetter(fieldName)
    const currentDate = new Date()

    if (!date || date.isAfter(currentDate, 'day')) {
      return Promise.resolve()
    }

    if (date.isSame(currentDate, 'day')) {
      return value.isBefore(currentDate, 'minute')
        ? Promise.reject(new Error(validationMessages.time.canNotBeInPast))
        : Promise.resolve()
    } else {
      return Promise.resolve()
    }
  }
