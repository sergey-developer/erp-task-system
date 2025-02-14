import { UploadFile } from 'antd/es/upload'
import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentDetailDTO } from 'features/equipments/api/dto'
import { EquipmentByFileTableRow } from 'features/equipments/components/EquipmentsByFileTable/types'
import { BaseRelocationTaskFormFields } from 'features/relocationTasks/components/RelocationTaskForm/types'

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
  category?: EquipmentDetailDTO['category']
  attachments?: UploadFile<FileResponse>[]
}

export type RelocationTaskFormFields = BaseRelocationTaskFormFields<RelocationTaskEquipment> & {
  equipmentsByFile?: EquipmentByFileTableRow[]
  images?: UploadFile<FileResponse>[]
}
