import { Rule } from 'rc-field-form/es/interface'

import { dateValidator, timeValidator } from 'shared/utils/validation/dateTime'

export const dateRules: Rule[] = [
  {
    type: 'date',
    validator: dateValidator({ required: false }),
  },
]

export const timeRules: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    validator: timeValidator({ dateGetter: getFieldValue, dateFieldName: 'date', required: false }),
  }),
]
