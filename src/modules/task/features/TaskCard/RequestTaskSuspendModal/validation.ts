import { Moment } from 'moment'
import { Rule } from 'rc-field-form/es/interface'

import { SuspendReasonEnum } from 'modules/task/constants/common'
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
        ? value.isSameOrAfter(new Date(), 'days')
          ? Promise.resolve()
          : Promise.reject(new Error(validationMessages.date.canNotBeInPast))
        : Promise.reject(validationMessages.required),
  },
]

export const END_TIME_RULES: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: (rule, value: Moment) =>
      value
        ? getFieldValue('endDate')
          ? value.isSameOrAfter(new Date(), 'minutes')
            ? Promise.resolve()
            : Promise.reject(new Error(validationMessages.time.canNotBeInPast))
          : Promise.resolve()
        : Promise.reject(validationMessages.required),
  }),
]
