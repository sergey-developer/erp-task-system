import { ReclassificationReasonEnum } from 'modules/task/constants/common'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type CreateTaskReclassificationRequestMutationArgsModel =
  BaseTaskRequestArgs & {
    comment: string
    reclassificationReason: ReclassificationReasonEnum
  }
