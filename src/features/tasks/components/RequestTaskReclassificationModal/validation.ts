import { Rule } from 'rc-field-form/es/interface'

import { ReclassificationReasonEnum } from 'features/tasks/constants/taskReclassificationRequest'

export const commentRules: Rule[] = [{ required: true, whitespace: true, max: 10000 }]

export const reclassificationReasonRules: Rule[] = [
  {
    required: true,
    type: 'enum',
    enum: Object.values(ReclassificationReasonEnum),
  },
]
