import { Moment } from 'moment-timezone'

import { CreateTaskSuspendRequestBadRequestErrorResponse } from 'modules/task/models'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

import { RequestTaskSuspendFormErrors } from './types'

export const getFormErrorsFromBadRequestError = (
  errors: CreateTaskSuspendRequestBadRequestErrorResponse,
): RequestTaskSuspendFormErrors => ({
  comment: errors.comment,
  reason: errors.suspendReason,
  endDate: errors.suspendEndAt,
  endTime: errors.suspendEndAt,
  taskLink: errors.externalRevisionLink,
  organization: errors.externalResponsibleCompany,
})

export const getDateLimitExceedError = (limitDate: Moment): string =>
  `Дата не может быть больше ${formatDate(limitDate, DATE_FORMAT)}`
