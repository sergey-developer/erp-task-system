import { Rule } from 'rc-field-form/es/interface'

import { dateValidator, timeValidator } from 'shared/utils/validation/dateTime'

export const dateRules = (required: boolean): Rule[] => [
  {
    type: 'date',
    validator: dateValidator({ required }),
  },
]

export const timeRules = (required: boolean): Rule[] => [
  ({ getFieldValue }) => ({
    type: 'date',
    validator: timeValidator({ dateGetter: getFieldValue, dateFieldPath: 'date', required }),
  }),
]
