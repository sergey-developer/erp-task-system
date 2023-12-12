import { FormInstance, ModalProps } from 'antd'
import { Moment } from 'moment-timezone'

import {
  ExternalResponsibleCompanyEnum,
  SuspendReasonEnum,
} from 'modules/task/constants/taskSuspendRequest'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { FieldsErrors } from 'shared/services/baseApi'

export type RequestTaskSuspendModalProps = Required<Pick<BaseModalProps, 'open'>> & {
  recordId: string
  onSubmit: (
    values: RequestTaskSuspendFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
  isLoading: boolean
}

export type RequestTaskSuspendFormFields = {
  reason: SuspendReasonEnum
  externalRevisionLink?: string
  externalResponsibleCompany?: ExternalResponsibleCompanyEnum
  endDate: Moment
  endTime: Moment
  comment: string
}

export type RequestTaskSuspendFormErrors = FieldsErrors<RequestTaskSuspendFormFields>
