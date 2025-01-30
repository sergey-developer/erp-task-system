import { UploadFile } from 'antd/es/upload'

import { BaseRelocationTaskFormFields } from 'features/warehouse/components/RelocationTaskForm/types'
import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentModel, InventorizationEquipmentListItemModel } from 'features/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'features/warehouse/types/inventorization'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type CreateRelocationTaskDraftPageLocationState = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
>

export type RelocationTaskInventorizationEquipment = {
  rowId: number
  id: IdType
  equipment: InventorizationEquipmentListItemModel['equipment']
  condition: EquipmentConditionEnum

  quantity?: number
  serialNumber?: string
  price?: number
  relocationEquipmentId?: IdType
  currency?: IdType
  category?: EquipmentModel['category']
  attachments?: UploadFile<FileResponse>[]
}

export type RelocationTaskDraftFormFields =
  BaseRelocationTaskFormFields<RelocationTaskInventorizationEquipment>
