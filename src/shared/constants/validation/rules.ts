import { Rule } from 'rc-field-form/es/interface'

export const DEFAULT_SHORT_TEXT_LENGTH: number = 100

export const DEFAULT_MIDDLE_TEXT_LENGTH: number = 250

export const DEFAULT_LONG_TEXT_LENGTH: number = 500

export const validationSizes = {
  string: {
    short: 100,
    middle: 250,
    long: 500,
  },
} as const

export const DEFAULT_LONG_TEXT_RULES: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

export const DEFAULT_MIDDLE_TEXT_RULES: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.middle,
  },
]
