import { Rule } from 'rc-field-form/es/interface'

import { INCORRECT_EMAIL_MSG } from 'modules/auth/features/Login/constants/messages'
import { REQUIRED_FIELD_RULE } from 'shared/constants/validation'

export const PASSWORD_RULES: Rule[] = [
  { ...REQUIRED_FIELD_RULE, whitespace: true },
]

export const EMAIL_RULES: Rule[] = [
  REQUIRED_FIELD_RULE,
  { type: 'email', message: INCORRECT_EMAIL_MSG },
]
