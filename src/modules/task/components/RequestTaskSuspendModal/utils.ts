import { CreateTaskSuspendRequestBadRequestErrorResponse } from 'modules/task/models'

import { RequestTaskSuspendFormErrors } from './types'

export const getFormErrorsFromBadRequestError = (
  errors: CreateTaskSuspendRequestBadRequestErrorResponse,
): RequestTaskSuspendFormErrors => ({
  comment: errors.comment,
  reason: errors.suspendReason,
  endDate: errors.suspendEndAt,
  endTime: errors.suspendEndAt,
})
