import { Rule } from 'rc-field-form/lib/interface'

export const PASSWORD_RULES: Rule[] = [
  { required: true, message: 'Обязательное поле', whitespace: true },
]
export const EMAIL_RULES: Rule[] = [
  { required: true, message: 'Обязательное поле', type: 'email' },
]
