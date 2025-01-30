import { Rule } from 'rc-field-form/es/interface'

export const passwordRules: Rule[] = [{ required: true, whitespace: true }]
export const emailRules: Rule[] = [{ type: 'email', required: true }]
