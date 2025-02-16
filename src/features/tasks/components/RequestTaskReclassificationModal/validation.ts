import { ReclassificationReasonEnum } from 'features/tasks/api/constants'
import { Rule } from 'rc-field-form/es/interface'

export const commentRules: Rule[] = [{ required: true, whitespace: true, max: 10000 }]

export const reclassificationReasonRules: Rule[] = [
  {
    required: true,
    type: 'enum',
    enum: Object.values(ReclassificationReasonEnum),
  },
]
