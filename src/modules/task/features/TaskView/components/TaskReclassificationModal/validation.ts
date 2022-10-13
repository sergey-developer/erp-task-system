import { Rule } from 'rc-field-form/es/interface'

import { ReclassificationReasonEnum } from 'modules/task/constants/common'

export const RECLASSIFICATION_REASON_RULES: Rule[] = [
  { required: true },
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
    required: true,
    whitespace: true,
  },
  {
    max: 500,
  },
]
