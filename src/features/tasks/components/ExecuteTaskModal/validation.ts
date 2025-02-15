import { Rule } from 'rc-field-form/es/interface'

import { validationSizes } from 'shared/constants/validation'

export const techResolutionRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

export const userResolutionRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

export const spentHoursRules: Rule[] = [
  (form) => ({
    type: 'integer',
    required: !form.getFieldValue('spentMinutes'),
    min: 0,
  }),
]

export const spentMinutesRules: Rule[] = [
  (form) => ({
    type: 'integer',
    required: !form.getFieldValue('spentHours'),
    min: 0,
    max: 59,
  }),
]
