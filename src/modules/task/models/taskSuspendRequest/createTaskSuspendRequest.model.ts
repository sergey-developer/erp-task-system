import {
  ExternalResponsibleCompanyEnum,
  SuspendReasonEnum,
} from 'modules/task/constants/taskSuspendRequest'
import { SuspendRequestModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

import { ErrorResponse } from 'shared/services/baseApi'

export type CreateTaskSuspendRequestMutationArgs = BaseTaskRequestArgs & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
  externalRevisionLink?: string
  externalResponsibleCompany?: ExternalResponsibleCompanyEnum
}

export type CreateTaskSuspendRequestSuccessResponse = SuspendRequestModel

export type CreateTaskSuspendRequestBadRequestErrorResponse = ErrorResponse<
  Pick<
    CreateTaskSuspendRequestMutationArgs,
    | 'comment'
    | 'suspendEndAt'
    | 'suspendReason'
    | 'externalRevisionLink'
    | 'externalResponsibleCompany'
  >
>
