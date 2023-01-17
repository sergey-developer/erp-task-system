import moment, { Moment } from 'moment'
import { Rule } from 'rc-field-form/es/interface'

import { REQUIRED_FIELD_MSG } from 'shared/constants/validation'

import { SuspendReasonDict } from './constants'

export const REASON_RULES: Rule[] = [
  {
    required: true,
    type: 'enum',
    enum: Object.values(SuspendReasonDict),
    message: 'Недопустимая причина ожидания',
  },
]

export const END_DATE_RULES: Rule[] = [
  {
    type: 'date',
    required: true,
    validator: (rule, value: Moment) =>
      value
        ? value.isSameOrAfter(moment(), 'minutes')
          ? Promise.resolve()
          : Promise.reject(new Error('Дата не может быть в прошлом времени'))
        : Promise.reject(REQUIRED_FIELD_MSG),
  },
]

export const END_TIME_RULES: Rule[] = [
  {
    type: 'date',
    required: true,
    validator: (rule, value: Moment) =>
      value
        ? value.isSameOrAfter(moment(), 'minutes')
          ? Promise.resolve()
          : Promise.reject(new Error('Время не может быть в прошлом времени'))
        : Promise.reject(REQUIRED_FIELD_MSG),
  },
]
