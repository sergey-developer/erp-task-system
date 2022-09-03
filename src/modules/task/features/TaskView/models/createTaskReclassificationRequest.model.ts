import { ReclassificationReasonEnum } from 'modules/task/constants/enums'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type CreateTaskReclassificationRequestMutationArgsModel =
  BaseTaskRequestArgs & {
    comment: string
    reclassificationReason: ReclassificationReasonEnum
  }
