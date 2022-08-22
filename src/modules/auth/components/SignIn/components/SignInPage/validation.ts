import { Rule } from 'rc-field-form/es/interface'

import { REQUIRED_FIELD_RULE } from 'shared/constants/validation'

export const PASSWORD_RULES: Rule[] = [
  { ...REQUIRED_FIELD_RULE, whitespace: true },
]

export const EMAIL_RULES: Rule[] = [
  REQUIRED_FIELD_RULE,
  { type: 'email', message: 'Введён не корректный email' },
]
