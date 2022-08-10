import { Rule } from 'rc-field-form/lib/interface'
import {
  REQUIRED_FIELD_RULE,
  TEXT_MAX_LENGHT_MSG,
} from 'shared/constants/validation'

const BASE_FIELD_RULES: Rule[] = [
  {
    ...REQUIRED_FIELD_RULE,
    whitespace: true,
  },
  {
    max: 500,
    message: TEXT_MAX_LENGHT_MSG,
  },
]

export const TECH_RESOLUTION_RULES: Rule[] = BASE_FIELD_RULES

export const USER_RESOLUTION_RULES: Rule[] = BASE_FIELD_RULES
