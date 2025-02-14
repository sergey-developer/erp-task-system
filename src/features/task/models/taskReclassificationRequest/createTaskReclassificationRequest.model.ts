import { ReclassificationReasonEnum } from 'features/task/constants/taskReclassificationRequest'
import { TaskReclassificationRequestModel } from 'features/task/models'
import { RequestWithTask } from 'features/task/types'

export type CreateTaskReclassificationRequestRequest = RequestWithTask & {
  comment: string
  reclassificationReason: ReclassificationReasonEnum
}

export type CreateTaskReclassificationRequestResponse = TaskReclassificationRequestModel
