import { Moment } from 'moment-timezone'
import { Rule } from 'rc-field-form/es/interface'

import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

import { validationMessages } from 'shared/constants/validation'

export const REASON_RULES: Rule[] = [
  {
    required: true,
    type: 'enum',
    enum: Object.values(SuspendReasonEnum),
  },
]

export const END_DATE_RULES: Rule[] = [
  {
    type: 'date',
    required: true,
    validator: (rule, value: Moment) =>
      value
        ? value.isBefore(new Date(), 'day')
          ? Promise.reject(new Error(validationMessages.date.canNotBeInPast))
          : Promise.resolve()
        : Promise.reject(validationMessages.required),
  },
]

export const END_TIME_RULES: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: (rule, value: Moment) => {
      if (!value) return Promise.reject(validationMessages.required)

      const endDate: Moment = getFieldValue('endDate')
      const currentDate = new Date()

      if (!endDate || endDate.isAfter(currentDate, 'day')) {
        return Promise.resolve()
      }

      if (endDate.isSame(currentDate, 'day')) {
        return value.isBefore(currentDate, 'minute')
          ? Promise.reject(new Error(validationMessages.time.canNotBeInPast))
          : Promise.resolve()
      } else {
        return Promise.resolve()
      }
    },
  }),
]
