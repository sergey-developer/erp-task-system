import { Moment } from 'moment-timezone'

import { SuspendReasonEnum } from 'modules/task/constants'

import { FieldsErrors } from 'shared/services/api'

type FormFields = {
  reason: SuspendReasonEnum
  endDate: Moment
  endTime: Moment
  comment: string
}

export type RequestTaskSuspendFormFields = FormFields

export type RequestTaskSuspendFormErrors = FieldsErrors<FormFields>
