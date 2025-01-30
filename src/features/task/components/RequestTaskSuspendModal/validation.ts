import isNumber from 'lodash/isNumber'
import moment, { Moment } from 'moment-timezone'
import { Rule } from 'rc-field-form/es/interface'

import { SuspendReasonEnum } from 'features/task/constants/taskSuspendRequest'

import { validationMessages } from 'shared/constants/validation'
import { timeValidator } from 'shared/utils/validation'

import { getDateLimitExceedError } from './utils'

export const commentRules: Rule[] = [{ required: true, whitespace: true, max: 10000 }]

export const reasonRules: Rule[] = [
  { required: true, type: 'enum', enum: Object.values(SuspendReasonEnum) },
]

export const taskLinkRules: Rule[] = [{ required: true, type: 'url' }]

export const endDateRules = (limit?: number): Rule[] => [
  {
    type: 'date',
    required: true,
    validator: (rule: Rule, value: Moment) => {
      const limitDate = isNumber(limit) ? moment().add(limit, 'days') : undefined

      if (value) {
        if (value.isBefore(moment(), 'day')) {
          return Promise.reject(new Error(validationMessages.date.canNotBeInPast))
        } else if (limitDate && value.isAfter(limitDate, 'day')) {
          return Promise.reject(getDateLimitExceedError(limitDate))
        } else {
          return Promise.resolve()
        }
      } else {
        return Promise.reject(validationMessages.required)
      }
    },
  },
]

export const endTimeRules: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: timeValidator({
      dateGetter: getFieldValue,
      dateFieldPath: 'endDate',
      required: true,
    }),
  }),
]
