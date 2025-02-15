import { ExternalResponsibleCompanyEnum, SuspendReasonEnum } from 'features/tasks/api/constants'
import { TaskSuspendRequestDTO } from 'features/tasks/api/dto'
import { RequestWithTask } from 'features/tasks/api/types'

import { FieldsErrors } from 'shared/api/baseApi'

export type CreateTaskSuspendRequestRequest = RequestWithTask & {
  comment: string
  suspendEndAt: string
  suspendReason: SuspendReasonEnum
  externalRevisionLink?: string
  externalResponsibleCompany?: ExternalResponsibleCompanyEnum
}

export type CreateTaskSuspendRequestResponse = TaskSuspendRequestDTO

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
