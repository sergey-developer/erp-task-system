import { makeMaxLengthMessage } from 'shared/utils/validation'

import {
  DEFAULT_LONG_TEXT_LENGTH,
  DEFAULT_MIDDLE_TEXT_LENGTH,
  DEFAULT_SHORT_TEXT_LENGTH,
} from './rules'

export const REQUIRED_FIELD_MSG = 'Обязательное поле'

export const FIELD_CAN_NOT_BE_EMPTY_MSG = 'Поле не может быть пустым'

export const INCORRECT_EMAIL_MSG = 'Введён не корректный email'

const validationTemplateMessages = {
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
        DEFAULT_SHORT_TEXT_LENGTH,
      ),
      middle: makeMaxLengthMessage(
        validationTemplateMessages.string.max,
        DEFAULT_MIDDLE_TEXT_LENGTH,
      ),
      long: makeMaxLengthMessage(
        validationTemplateMessages.string.max,
        DEFAULT_LONG_TEXT_LENGTH,
      ),
    },
  },
} as const

export const TEXT_MAX_LENGTH_MSG =
  // eslint-disable-next-line no-template-curly-in-string
  'Убедитесь, что это значение содержит не более ${max} символов'

export const DEFAULT_LONG_TEXT_MAX_LENGTH_MSG = makeMaxLengthMessage(
  TEXT_MAX_LENGTH_MSG,
  DEFAULT_LONG_TEXT_LENGTH,
)

export const DEFAULT_MIDDLE_TEXT_MAX_LENGTH_MSG = makeMaxLengthMessage(
  TEXT_MAX_LENGTH_MSG,
  DEFAULT_MIDDLE_TEXT_LENGTH,
)
