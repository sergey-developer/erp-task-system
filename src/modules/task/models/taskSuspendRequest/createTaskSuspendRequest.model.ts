import {
  ExternalResponsibleCompanyEnum,
  SuspendReasonEnum,
} from 'modules/task/constants/taskSuspendRequest'
import { SuspendRequestModel } from 'modules/task/models'
import { TaskRequestArgs } from 'modules/task/types'

import { FieldsErrors } from 'shared/services/baseApi'

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
