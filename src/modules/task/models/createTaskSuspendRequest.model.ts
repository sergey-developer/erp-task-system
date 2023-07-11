import { SuspendReasonEnum } from 'modules/task/constants'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { ErrorResponse } from 'shared/services/api'

import { SuspendRequestModel } from './suspendRequest.model'

export type CreateTaskSuspendRequestMutationArgs = BaseTaskRequestArgs & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
}

export type CreateTaskSuspendRequestSuccessResponse = SuspendRequestModel

export type CreateTaskSuspendRequestBadRequestErrorResponse = ErrorResponse<
  Omit<CreateTaskSuspendRequestMutationArgs, 'taskId'>
>
