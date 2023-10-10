import { Rule } from 'rc-field-form/es/interface'

import { ReclassificationReasonEnum } from 'modules/task/constants/taskReclassificationRequest'

export const reclassificationReasonRules: Rule[] = [
  {
    required: true,
    type: 'enum',
    enum: Object.values(ReclassificationReasonEnum),
  },
]
