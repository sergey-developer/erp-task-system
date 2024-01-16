import { FormInstance, ModalProps } from 'antd'
import { Moment } from 'moment-timezone'

import {
  ExternalResponsibleCompanyEnum,
  SuspendReasonEnum,
} from 'modules/task/constants/taskSuspendRequest'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { SystemSettingsModel } from 'shared/models/system'
import { FieldsErrors } from 'shared/services/baseApi'

export type RequestTaskSuspendModalProps = Required<Pick<BaseModalProps, 'open'>> & {
  recordId: string
  onSubmit: (
    values: RequestTaskSuspendFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
  isLoading: boolean
  systemSettings?: SystemSettingsModel
}

export type RequestTaskSuspendFormFields = {
  reason: SuspendReasonEnum
  taskLink?: string
  organization?: ExternalResponsibleCompanyEnum
  endDate: Moment
  endTime: Moment
  comment: string
}

export type RequestTaskSuspendFormErrors = FieldsErrors<RequestTaskSuspendFormFields>
