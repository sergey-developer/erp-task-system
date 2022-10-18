import { Rule } from 'rc-field-form/es/interface'

export const DEFAULT_LONG_TEXT_LENGTH: number = 500

export const BASE_LONG_TEXT_RULES: Rule[] = [
  {
    required: true,
    whitespace: true,
  },
  {
    max: DEFAULT_LONG_TEXT_LENGTH,
  },
]
