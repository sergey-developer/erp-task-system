import { Rule } from 'rc-field-form/es/interface'

export const validationSizes = {
  string: {
    short: 100,
    middle: 250,
    long: 500,
  },
} as const

export const validationRules = {
  required: { required: true } as Rule,
  string: {
    short: {
      required: true,
      whitespace: true,
      max: validationSizes.string.short,
    } as Rule,
    middle: {
      required: true,
      whitespace: true,
      max: validationSizes.string.middle,
    } as Rule,
    long: {
      required: true,
      whitespace: true,
      max: validationSizes.string.long,
    } as Rule,
  },
} as const
