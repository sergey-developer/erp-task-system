import { Moment } from 'moment'

import { FieldsErrors } from 'shared/services/api'

import { SuspendReasonDict } from './constants'

type FormFields = {
  suspendReason: SuspendReasonDict
  endDate: Moment
  endTime: Moment
  comment: string
}

export type RequestTaskSuspendFormFields = FormFields

export type RequestTaskSuspendFormErrors = FieldsErrors<FormFields>
