import { Rule } from 'rc-field-form/es/interface'

export const REQUIRED_FIELD_RULE: Rule = {
  required: true,
  message: 'Обязательное поле',
}

export const TEXT_MAX_LENGTH_MSG =
  'Убедитесь, что это значение содержит не более ${max} символов'
