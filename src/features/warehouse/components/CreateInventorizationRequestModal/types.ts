import { FormInstance, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { UsersModel } from 'features/user/models'
import { InventorizationTypeEnum } from 'features/warehouse/constants/inventorization'
import { EquipmentNomenclaturesModel, WarehousesModel } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type CreateInventorizationRequestFormFields = {
  type: InventorizationTypeEnum
  warehouses: IdType[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  executor: IdType
  nomenclatures?: IdType[]
  description?: string
  attachments?: UploadFile<FileResponse>[]
}

export type CreateInventorizationRequestModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  executors: UsersModel
  executorsIsLoading: boolean

  warehouses: WarehousesModel
  warehousesIsLoading: boolean
  onChangeWarehouses: (value: IdType[]) => void

  nomenclatures: EquipmentNomenclaturesModel
  nomenclaturesIsLoading: boolean

  onCreateAttachment: NonNullable<UploadProps['customRequest']>
  attachmentIsCreating: boolean
  onDeleteAttachment: NonNullable<UploadProps<FileResponse>['onRemove']>
  attachmentIsDeleting: boolean

  onSubmit: (
    values: CreateInventorizationRequestFormFields,
    setFields: FormInstance<CreateInventorizationRequestFormFields>['setFields'],
  ) => Promise<void>
}
