import { Rule } from 'rc-field-form/es/interface'

import { dateValidator, timeValidator } from 'shared/utils/validation/dateTime'

export const deadlineAtDateRules: Rule[] = [
  {
    type: 'date',
    required: true,
    validator: dateValidator({ required: true }),
  },
]

export const deadlineAtTimeRules: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: timeValidator({
      dateGetter: getFieldValue,
      dateFieldPath: 'deadlineAtDate',
      required: true,
    }),
  }),
]
