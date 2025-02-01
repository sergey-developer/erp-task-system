import { FormInstance, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { FaChangeTypesCatalogDTO } from 'shared/catalogs/api/dto/faChangeTypes'
import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type CreateRegistrationFNRequestModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  values: Partial<Pick<CreateRegistrationFNRequestFormFields, 'changeType'>>

  changeTypes: FaChangeTypesCatalogDTO
  changeTypesIsLoading: boolean

  email: string[]
  emailAsCopy: string[]
  recipientsIsLoading: boolean

  onCreateAttachment: NonNullable<UploadProps['customRequest']>
  createAttachmentIsLoading: boolean

  onSubmit: (
    values: CreateRegistrationFNRequestFormFields,
    setFields: FormInstance<CreateRegistrationFNRequestFormFields>['setFields'],
  ) => Promise<void>
}

export type CreateRegistrationFNRequestFormFields = {
  changeType: IdType
  attachments: UploadFile<FileResponse>[]
}
