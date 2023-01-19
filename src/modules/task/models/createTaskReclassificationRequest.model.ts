import { ReclassificationReasonEnum } from 'modules/task/constants/common'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { TaskReclassificationRequestModel } from './taskReclassificationRequest.model'

export type CreateTaskReclassificationRequestMutationArgs =
  BaseTaskRequestArgs & {
    comment: string
    reclassificationReason: ReclassificationReasonEnum
  }

export type CreateTaskReclassificationRequestSuccessResponse =
  TaskReclassificationRequestModel
