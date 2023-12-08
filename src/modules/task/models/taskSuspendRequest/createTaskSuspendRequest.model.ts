import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'
import { SuspendRequestModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

import { FieldsErrors } from 'shared/services/baseApi'

export type CreateTaskSuspendRequestMutationArgs = BaseTaskRequestArgs & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
}

export type CreateTaskSuspendRequestSuccessResponse = SuspendRequestModel

export type CreateTaskSuspendRequestBadRequestErrorResponse = FieldsErrors<
  Pick<CreateTaskSuspendRequestMutationArgs, 'comment' | 'suspendEndAt' | 'suspendReason'>
>
