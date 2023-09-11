import { ReclassificationReasonEnum } from 'modules/task/constants'
import { TaskReclassificationRequestModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

export type CreateTaskReclassificationRequestMutationArgs = BaseTaskRequestArgs & {
  comment: string
  reclassificationReason: ReclassificationReasonEnum
}

export type CreateTaskReclassificationRequestSuccessResponse = TaskReclassificationRequestModel
