import { Rule } from 'rc-field-form/es/interface'

export const DEFAULT_LONG_TEXT_LENGTH: number = 500

export const BASE_LONG_TEXT_RULES: Rule[] = [
  {
    required: true,
    whitespace: true,
  },
  {
    max: DEFAULT_LONG_TEXT_LENGTH,
  },
]

export const REQUIRED_FIELD_MSG = 'Обязательное поле'
export const FIELD_CAN_NOT_BE_EMPTY_MSG = 'Поле не может быть пустым'

export const UNKNOWN_ERROR_MSG = 'Неизвестная ошибка'

export const INCORRECT_EMAIL_MSG = 'Введён не корректный email'

export const TEXT_MAX_LENGTH_MSG =
  // eslint-disable-next-line no-template-curly-in-string
  'Убедитесь, что это значение содержит не более ${max} символов'
