import { Rule } from 'rc-field-form/es/interface'

import { ReclassificationReasonEnum } from 'modules/task/constants/taskReclassificationRequest'

export const commentRules: Rule[] = [{ required: true, whitespace: true }]

export const RECLASSIFICATION_REASON_RULES: Rule[] = [
  {
    required: true,
    type: 'enum',
    enum: Object.values(ReclassificationReasonEnum),
  },
]
