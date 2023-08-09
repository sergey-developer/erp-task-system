import { Rule } from 'rc-field-form/es/interface'

export const nameValidationRules: Rule[] = [
  { required: true, whitespace: true },
]

export const shortNameValidationRules: Rule[] = [
  { required: true, whitespace: true },
]

export const groupValidationRules: Rule[] = [{ required: true }]

export const vendorCodeValidationRules: Rule[] = [
  { required: true, whitespace: true },
]

export const measurementUnitValidationRules: Rule[] = [{ required: true }]
