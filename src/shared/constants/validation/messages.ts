import { makeMaxLengthMessage } from 'shared/utils/validation'

import { validationSizes } from './rules'

export const validationTemplateMessages = {
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    max: 'Убедитесь, что это значение содержит не более ${max} символов',
  },
} as const

export const validationMessages = {
  required: 'Обязательное поле',
  canNotBeEmpty: 'Поле не может быть пустым',
  email: {
    incorrect: 'Введён не корректный email',
  },
  date: {
    canNotBeInPast: 'Дата не может быть в прошлом времени',
  },
  time: {
    canNotBeInPast: 'Время не может быть в прошлом времени',
  },
  string: {
    max: {
      short: makeMaxLengthMessage(
        validationTemplateMessages.string.max,
        validationSizes.string.short,
      ),
      middle: makeMaxLengthMessage(
        validationTemplateMessages.string.max,
        validationSizes.string.middle,
      ),
      long: makeMaxLengthMessage(
        validationTemplateMessages.string.max,
        validationSizes.string.long,
      ),
    },
  },
} as const
