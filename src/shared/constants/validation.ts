import { Rule } from 'rc-field-form/lib/interface'

export const REQUIRED_FIELD_RULE: Rule = {
  required: true,
  message: 'Обязательное поле.',
}

export const TEXT_MAX_LENGHT_MSG =
  'Убедитесь, что это значение содержит не более ${max} символов.'
