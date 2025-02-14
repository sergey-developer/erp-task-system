import { UploadFile } from 'antd/es/upload'
import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentByFileTableRow } from 'features/equipments/components/EquipmentsByFileTable/types'
import { EquipmentDetailDTO } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type SimplifiedRelocationTaskEquipment = {
  rowId: number
  id: IdType
  relocationEquipmentId: IdType
  quantity: number
  condition: EquipmentConditionEnum

  serialNumber?: string
  purpose?: string
  amount?: number
  category?: EquipmentDetailDTO['category']
  attachments?: UploadFile<FileResponse>[]
}

export type SimplifiedRelocationTaskFormFields = {
  controller: IdType
  comment?: string

  equipmentsToShop?: SimplifiedRelocationTaskEquipment[]
  equipmentsToShopImages?: UploadFile<FileResponse>[]

  equipmentsToWarehouse?: SimplifiedRelocationTaskEquipment[]
  equipmentsToWarehouseByFile?: EquipmentByFileTableRow[]
  equipmentsToWarehouseImages?: UploadFile<FileResponse>[]
}
