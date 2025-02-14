import { FormInstance, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { EquipmentNomenclaturesDTO } from 'features/equipments/api/dto'
import { UsersDTO } from 'features/users/api/dto'
import { WarehousesModel } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

import { InventorizationTypeEnum } from '../../api/constants'

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
  executors: UsersDTO
  executorsIsLoading: boolean

  warehouses: WarehousesModel
  warehousesIsLoading: boolean
  onChangeWarehouses: (value: IdType[]) => void

  nomenclatures: EquipmentNomenclaturesDTO
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
