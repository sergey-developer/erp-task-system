import { FormInstance, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { UrgencyRateTypesModel } from 'shared/models/catalogs/urgencyRateTypes'
import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type CreateInfrastructureOrderFormFields = {
  urgencyRateType: IdType
  attachments?: UploadFile<FileResponse>[]
}

export type CreateInfrastructureOrderModalProps = Pick<BaseModalProps, 'open' | 'onCancel'> & {
  isLoading: boolean
  onSubmit: (
    values: CreateInfrastructureOrderFormFields,
    form: FormInstance<CreateInfrastructureOrderFormFields>,
  ) => Promise<void>

  urgencyRateTypes: UrgencyRateTypesModel
  urgencyRateTypesIsLoading: boolean

  onUploadFile: NonNullable<UploadProps['customRequest']>
  fileIsUploading: boolean
  onDeleteFile: NonNullable<UploadProps<FileResponse>['onRemove']>
  fileIsDeleting: boolean
}
