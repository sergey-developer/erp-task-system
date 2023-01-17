import { Rule } from 'rc-field-form/es/interface'

export const TEMPLATE_RULES: Rule[] = [{ required: true }]

export const TITLE_RULES: Rule[] = [
  { required: true, whitespace: true, max: 100 },
]
