import { SuspendReasonEnum } from 'modules/task/constants/common'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'
import { ErrorResponse } from 'shared/services/api'

export type CreateTaskSuspendRequestMutationArgsModel = BaseTaskRequestArgs & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
}

export type CreateTaskSuspendRequestSuccessResponse = void

export type CreateTaskSuspendRequestBadRequestErrorResponse = ErrorResponse<
  Omit<CreateTaskSuspendRequestMutationArgsModel, 'taskId'>
>
