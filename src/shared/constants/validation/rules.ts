import { Rule } from 'rc-field-form/es/interface'

export const DEFAULT_LONG_TEXT_LENGTH: number = 500

export const DEFAULT_MIDDLE_TEXT_LENGTH: number = 250

export const DEFAULT_LONG_TEXT_RULES: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: DEFAULT_LONG_TEXT_LENGTH,
  },
]

export const DEFAULT_MIDDLE_TEXT_RULES: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: DEFAULT_MIDDLE_TEXT_LENGTH,
  },
]
