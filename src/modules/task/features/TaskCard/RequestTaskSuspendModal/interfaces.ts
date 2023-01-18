import { Moment } from 'moment'

import { SuspendReasonEnum } from 'modules/task/constants/common'
import { FieldsErrors } from 'shared/services/api'

type FormFields = {
  suspendReason: SuspendReasonEnum
  endDate: Moment
  endTime: Moment
  comment: string
}

export type RequestTaskSuspendFormFields = FormFields

export type RequestTaskSuspendFormErrors = FieldsErrors<FormFields>
