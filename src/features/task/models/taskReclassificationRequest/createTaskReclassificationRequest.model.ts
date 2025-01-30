import { ReclassificationReasonEnum } from 'features/task/constants/taskReclassificationRequest'
import { TaskReclassificationRequestModel } from 'features/task/models'
import { TaskRequestArgs } from 'features/task/types'

export type CreateTaskReclassificationRequestMutationArgs = TaskRequestArgs & {
  comment: string
  reclassificationReason: ReclassificationReasonEnum
}

export type CreateTaskReclassificationRequestSuccessResponse = TaskReclassificationRequestModel
