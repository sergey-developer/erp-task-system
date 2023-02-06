import { Rule } from 'rc-field-form/es/interface'

export const PASSWORD_RULES: Rule[] = [{ required: true, whitespace: true }]

export const EMAIL_RULES: Rule[] = [{ type: 'email', required: true }]
