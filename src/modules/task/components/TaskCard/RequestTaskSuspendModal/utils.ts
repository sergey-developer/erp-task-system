import { CreateTaskSuspendRequestBadRequestErrorResponse } from 'modules/task/models'

import { RequestTaskSuspendFormErrors } from './interfaces'

export const getFormErrorsFromBadRequestError = (
  errors: CreateTaskSuspendRequestBadRequestErrorResponse,
): RequestTaskSuspendFormErrors => ({
  comment: errors.data.comment,
  reason: errors.data.suspendReason,
  endDate: errors.data.suspendEndAt,
  endTime: errors.data.suspendEndAt,
})
