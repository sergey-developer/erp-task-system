import { Rule } from 'rc-field-form/es/interface'

import { timeValidator, dateValidator } from 'shared/utils/validation/dateTime'

export const deadlineAtDateRules: Rule[] = [
  {
    type: 'date',
    required: true,
    validator: dateValidator,
  },
]

export const deadlineAtTimeRules: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: timeValidator(getFieldValue, 'deadlineAtDate'),
  }),
]
