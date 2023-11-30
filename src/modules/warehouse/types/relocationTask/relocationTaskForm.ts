import { UploadFile } from 'antd/es/upload'
import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type RelocationTaskEquipment = {
  rowId: number
  id: IdType
  relocationEquipmentId: IdType
  quantity: number
  condition: EquipmentConditionEnum

  serialNumber?: string
  purpose?: string
  amount?: number
  price?: number
  currency?: IdType
  category?: EquipmentModel['category']
  attachments?: UploadFile<FileResponse>[]
}

export type RelocationTaskFormFields = {
  equipments: RelocationTaskEquipment[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  relocateFrom: IdType
  relocateTo: IdType
  executor: IdType

  comment?: string
}
