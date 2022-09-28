import { Rule } from 'rc-field-form/es/interface'

import { ReclassificationReasonEnum } from 'modules/task/constants/common'
import {
  REQUIRED_FIELD_RULE,
  TEXT_MAX_LENGTH_MSG,
} from 'shared/constants/validation'

export const RECLASSIFICATION_REASON_RULES: Rule[] = [
  REQUIRED_FIELD_RULE,
  {
    type: 'enum',
    enum: [
      ReclassificationReasonEnum.WrongClassification,
      ReclassificationReasonEnum.WrongSupportGroup,
      ReclassificationReasonEnum.DivideTask,
    ],
    message: 'Недопустимая причина переклассификации',
  },
]

export const COMMENT_RULES: Rule[] = [
  {
    ...REQUIRED_FIELD_RULE,
    whitespace: true,
  },
  {
    max: 500,
    message: TEXT_MAX_LENGTH_MSG,
  },
]
