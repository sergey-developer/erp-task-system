import moment, { Moment } from 'moment-timezone'
import { FormInstance, NamePath, ValidatorRule } from 'rc-field-form/es/interface'

import { validationMessages } from 'shared/constants/validation'
import { MaybeNull, MaybeUndefined } from 'shared/types/utils'

export type DateValidatorArgs = Partial<{
  required: boolean
  canBeInPast: boolean
  maxDate: MaybeNull<string>
  maxDateMsg: string
}>

export const dateValidator =
  ({
    required,
    canBeInPast = false,
    maxDate,
    maxDateMsg,
  }: DateValidatorArgs): ValidatorRule['validator'] =>
  (rule, value: Moment) => {
    const currentDate = moment()

    if (value) {
      if (maxDate && value.isAfter(maxDate, 'day')) {
        return Promise.reject(maxDateMsg)
      } else if (!canBeInPast && value.isBefore(currentDate, 'day')) {
        return Promise.reject(validationMessages.date.canNotBeInPast)
      }
    } else if (required) {
      return Promise.reject(validationMessages.required)
    }

    return Promise.resolve()
  }

export type TimeValidatorArgs = Pick<DateValidatorArgs, 'maxDate'> & {
  dateGetter: FormInstance['getFieldValue']
  dateFieldPath: NamePath
  required: boolean
  canBeInPast?: boolean
  maxTimeMsg?: string
}

export const timeValidator =
  ({
    dateGetter,
    dateFieldPath,
    required,
    canBeInPast = false,
    maxDate,
    maxTimeMsg,
  }: TimeValidatorArgs): ValidatorRule['validator'] =>
  (rule, value: Moment) => {
    if (required && !value) return Promise.reject(validationMessages.required)

    const date: MaybeUndefined<Moment> = dateGetter(dateFieldPath)
    if (!date) {
      console.warn(
        'Time validation goes wrong because date value was not received in time validator because date field path is wrong or date value is falsy value',
      )
    }

    const currentDate = moment()

    if (date && maxDate) {
      const maxDateMoment = moment(maxDate)
      if (date.isSame(maxDateMoment, 'day')) {
        const updatedDate = date.set({
          hours: value.get('hours'),
          minutes: value.get('minutes'),
          seconds: value.get('seconds'),
        })
        if (updatedDate.isAfter(maxDateMoment, 'minute')) {
          return Promise.reject(maxTimeMsg)
        }
      }
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
