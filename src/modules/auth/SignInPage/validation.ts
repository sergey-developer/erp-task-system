import { Rule } from 'rc-field-form/lib/interface'

export const PASSWORD_RULES: Rule[] = [
  { required: true, message: 'Введите пароль' },
]
export const EMAIL_RULES: Rule[] = [
  { required: true, message: 'Введите E-mail', type: 'email' },
]
