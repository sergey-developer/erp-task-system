import { Rule } from 'rc-field-form/es/interface'

import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

import { dateValidator, timeValidator } from 'shared/utils/validation'

export const commentRules: Rule[] = [{ required: true, whitespace: true, max: 10000 }]

export const reasonRules: Rule[] = [
  { required: true, type: 'enum', enum: Object.values(SuspendReasonEnum) },
]

export const taskLinkRules: Rule[] = [{ required: true, type: 'url' }]

export const endDateRules: Rule[] = [{ type: 'date', required: true, validator: dateValidator }]

export const endTimeRules: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: timeValidator(getFieldValue, 'endDate'),
  }),
]
