import { FormInstance, UploadProps } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'

export type CreateRegistrationFNRequestModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  changeTypes: { id: number; title: string }[]
  changeTypesIsLoading: boolean

  email: string[]
  emailAsCopy: string[]

  onCreateAttachment: NonNullable<UploadProps['customRequest']>

  onSubmit: (
    values: CreateRegistrationFNRequestFormFields,
    setFields: FormInstance<CreateRegistrationFNRequestFormFields>['setFields'],
  ) => Promise<void>
}

export type CreateRegistrationFNRequestFormFields = {
  changeType: string
  attachments: IdType[]
}
