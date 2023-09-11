import { SuspendReasonEnum } from 'modules/task/constants'
import { SuspendRequestModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

import { ErrorResponse } from 'shared/services/baseApi'

export type CreateTaskSuspendRequestMutationArgs = BaseTaskRequestArgs & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
}

export type CreateTaskSuspendRequestSuccessResponse = SuspendRequestModel

export type CreateTaskSuspendRequestBadRequestErrorResponse = ErrorResponse<
  Pick<CreateTaskSuspendRequestMutationArgs, 'comment' | 'suspendEndAt' | 'suspendReason'>
>
