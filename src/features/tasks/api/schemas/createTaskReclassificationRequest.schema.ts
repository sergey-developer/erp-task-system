import { ReclassificationReasonEnum } from 'features/tasks/api/constants'
import { TaskReclassificationRequestDTO } from 'features/tasks/api/dto'
import { RequestWithTask } from 'features/tasks/api/types'

export type CreateTaskReclassificationRequestRequest = RequestWithTask & {
  comment: string
  reclassificationReason: ReclassificationReasonEnum
}

export type CreateTaskReclassificationRequestResponse = TaskReclassificationRequestDTO
