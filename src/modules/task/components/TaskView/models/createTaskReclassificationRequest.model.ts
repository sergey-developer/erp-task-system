import { ReclassificationReasonEnum } from 'modules/task/constants/enums'
import { BaseTaskRequestArgs } from 'modules/task/interfaces/baseTaskMutation'

export type CreateTaskReclassificationRequestMutationArgsModel =
  BaseTaskRequestArgs & {
    comment: string
    reclassificationReason: ReclassificationReasonEnum
  }
