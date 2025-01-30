import { UploadFile } from 'antd/es/upload'

import { EquipmentByFileTableRow } from 'features/warehouse/components/EquipmentsByFileTable/types'
import { BaseRelocationTaskFormFields } from 'features/warehouse/components/RelocationTaskForm/types'
import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentModel } from 'features/warehouse/models'

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

export type RelocationTaskFormFields = BaseRelocationTaskFormFields<RelocationTaskEquipment> & {
  equipmentsByFile?: EquipmentByFileTableRow[]
  images?: UploadFile<FileResponse>[]
}
