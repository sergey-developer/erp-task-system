import { ReclassificationReasonEnum } from 'modules/task/constants'
import { BaseTaskRequestArgs } from 'modules/task/types'

import { TaskReclassificationRequestModel } from './taskReclassificationRequest.model'

export type CreateTaskReclassificationRequestMutationArgs =
  BaseTaskRequestArgs & {
    comment: string
    reclassificationReason: ReclassificationReasonEnum
  }

export type CreateTaskReclassificationRequestSuccessResponse =
  TaskReclassificationRequestModel
