import { UploadFile } from 'antd/es/upload'
import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { EquipmentModel, InventorizationModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type CreateRelocationTaskDraftPageLocationState = {
  inventorization: Pick<InventorizationModel, 'executor' | 'status'>
}

export type RelocationTaskInventorizationEquipment = {
  rowId: number
  id: IdType
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
