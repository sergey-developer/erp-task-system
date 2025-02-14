import { UploadFile } from 'antd/es/upload'
import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { BaseRelocationTaskFormFields } from 'features/warehouse/components/RelocationTaskForm/types'
import {
  EquipmentDetailDTO,
  InventorizationEquipmentListItemModel,
} from 'features/warehouse/models'
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
  category?: EquipmentDetailDTO['category']
  attachments?: UploadFile<FileResponse>[]
}

export type RelocationTaskDraftFormFields =
  BaseRelocationTaskFormFields<RelocationTaskInventorizationEquipment>
