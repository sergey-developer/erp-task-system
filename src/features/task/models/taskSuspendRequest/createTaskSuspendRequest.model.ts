import {
  ExternalResponsibleCompanyEnum,
  SuspendReasonEnum,
} from 'features/task/constants/taskSuspendRequest'
import { SuspendRequestModel } from 'features/task/models'
import { RequestWithTask } from 'features/task/types'

import { FieldsErrors } from 'shared/api/baseApi'

export type CreateTaskSuspendRequestRequest = RequestWithTask & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
  externalRevisionLink?: string
  externalResponsibleCompany?: ExternalResponsibleCompanyEnum
}

export type CreateTaskSuspendRequestResponse = SuspendRequestModel

export type CreateTaskSuspendRequestBadRequestResponse = FieldsErrors<
  Pick<
    CreateTaskSuspendRequestRequest,
    | 'comment'
    | 'suspendEndAt'
    | 'suspendReason'
    | 'externalRevisionLink'
    | 'externalResponsibleCompany'
  >
>
