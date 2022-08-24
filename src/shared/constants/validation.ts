import { Rule } from 'rc-field-form/es/interface'

import { REQUIRED_FIELD_MSG } from 'shared/constants/messages'

export const REQUIRED_FIELD_RULE: Rule = {
  required: true,
  message: REQUIRED_FIELD_MSG,
}

export const TEXT_MAX_LENGTH_MSG =
  'Убедитесь, что это значение содержит не более ${max} символов'
