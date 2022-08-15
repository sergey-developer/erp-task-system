import { ReclassificationReasonEnum } from 'modules/task/constants/enums'
import { BaseTaskMutationArgs } from 'modules/task/interfaces/baseTaskMutation'

export type CreateTaskReclassificationRequestMutationArgsModel =
  BaseTaskMutationArgs & {
    comment: string
    reclassificationReason: ReclassificationReasonEnum
  }
