import { UploadFile } from 'antd/es/upload'
import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { EquipmentModel, InventorizationEquipmentListItemModel } from 'modules/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types/inventorization'

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
  currency?: IdType
  category?: EquipmentModel['category']
  attachments?: UploadFile<FileResponse>[]
}

export type RelocationTaskDraftFormFields = {
  type: RelocationTaskTypeEnum
  equipments: RelocationTaskInventorizationEquipment[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  relocateFrom?: IdType
  relocateTo?: IdType
  executors: IdType[]
  controller: IdType
  comment?: string
}
