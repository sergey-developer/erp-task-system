import { Rule } from 'rc-field-form/es/interface'

import {
  dateValidator,
  DateValidatorArgs,
  timeValidator,
  TimeValidatorArgs,
} from 'shared/utils/validation'

export const olaNextBreachDateRules = ({ maxDate }: Pick<DateValidatorArgs, 'maxDate'>): Rule[] => [
  {
    type: 'date',
    required: true,
    validator: dateValidator({
      required: true,
      canBeInPast: true,
      maxDate,
      maxDateMsg: 'Дата не может быть больше указанной в заявке',
    }),
  },
]

export const olaNextBreachTimeRules = ({ maxDate }: Pick<TimeValidatorArgs, 'maxDate'>): Rule[] => [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: timeValidator({
      dateGetter: getFieldValue,
      dateFieldPath: 'olaNextBreachDate',
      required: true,
      canBeInPast: true,
      maxDate,
      maxTimeMsg: 'Время не может быть больше указанной в заявке',
    }),
  }),
]
