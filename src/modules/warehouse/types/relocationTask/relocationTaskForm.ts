import { UploadFile } from 'antd/es/upload'
import { Moment } from 'moment-timezone'

import { EquipmentByFileTableRow } from 'modules/warehouse/components/EquipmentsByFileTable/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type RelocationTaskEquipment = {
  rowId: number
  id: IdType
  quantity: number
  condition: EquipmentConditionEnum

  serialNumber?: string
  purpose?: string
  amount?: number
  price?: number
  currency?: IdType
  relocationEquipmentId?: IdType
  category?: EquipmentModel['category']
  attachments?: UploadFile<FileResponse>[]
}

export type RelocationTaskFormFields = {
  type: RelocationTaskTypeEnum
  equipments: RelocationTaskEquipment[]
  equipmentsByFile?: EquipmentByFileTableRow[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  relocateFrom: IdType
  relocateTo?: IdType
  executor: IdType
  controller: IdType
  comment?: string
}
