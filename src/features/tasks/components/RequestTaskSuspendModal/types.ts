import { FormInstance, ModalProps } from 'antd'
import { ExternalResponsibleCompanyEnum, SuspendReasonEnum } from 'features/tasks/api/constants'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { FieldsErrors } from 'shared/api/baseApi'
import { SystemSettingsDTO } from 'shared/system/api/dto'

export type RequestTaskSuspendModalProps = Required<Pick<BaseModalProps, 'open'>> & {
  recordId: string
  onSubmit: (
    values: RequestTaskSuspendFormFields,
    setFields: FormInstance<RequestTaskSuspendFormFields>['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
  isLoading: boolean

  systemSettings?: SystemSettingsDTO
  systemSettingsIsLoading?: boolean
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
