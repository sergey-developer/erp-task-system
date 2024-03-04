import { ReclassificationReasonEnum } from 'modules/task/constants/taskReclassificationRequest'
import { TaskReclassificationRequestModel } from 'modules/task/models'
import { TaskRequestArgs } from 'modules/task/types'

export type CreateTaskReclassificationRequestMutationArgs = TaskRequestArgs & {
  comment: string
  reclassificationReason: ReclassificationReasonEnum
}

export type CreateTaskReclassificationRequestSuccessResponse = TaskReclassificationRequestModel
