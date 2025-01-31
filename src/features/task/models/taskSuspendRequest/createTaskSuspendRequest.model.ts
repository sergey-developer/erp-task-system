import {
  ExternalResponsibleCompanyEnum,
  SuspendReasonEnum,
} from 'features/task/constants/taskSuspendRequest'
import { SuspendRequestModel } from 'features/task/models'
import { TaskRequestArgs } from 'features/task/types'

import { FieldsErrors } from 'shared/api/baseApi'

export type CreateTaskSuspendRequestMutationArgs = TaskRequestArgs & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
  externalRevisionLink?: string
  externalResponsibleCompany?: ExternalResponsibleCompanyEnum
}

export type CreateTaskSuspendRequestSuccessResponse = SuspendRequestModel

export type CreateTaskSuspendRequestBadRequestErrorResponse = FieldsErrors<
  Pick<
    CreateTaskSuspendRequestMutationArgs,
    | 'comment'
    | 'suspendEndAt'
    | 'suspendReason'
    | 'externalRevisionLink'
    | 'externalResponsibleCompany'
  >
>
