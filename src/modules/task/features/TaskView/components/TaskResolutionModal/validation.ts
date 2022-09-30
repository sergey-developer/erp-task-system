import { Rule } from 'rc-field-form/es/interface'

const BASE_FIELD_RULES: Rule[] = [
  {
    required: true,
    whitespace: true,
  },
  {
    max: 500,
  },
]

export const TECH_RESOLUTION_RULES: Rule[] = BASE_FIELD_RULES

export const USER_RESOLUTION_RULES: Rule[] = BASE_FIELD_RULES
