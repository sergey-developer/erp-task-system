import { UploadFile } from 'antd/es/upload'

import { EquipmentByFileTableRow } from 'modules/warehouse/components/EquipmentsByFileTable/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

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
  category?: EquipmentModel['category']
  attachments?: UploadFile<FileResponse>[]
}

export type SimplifiedRelocationTaskFormFields = {
  controller?: IdType
  comment?: string

  equipmentsToShop?: SimplifiedRelocationTaskEquipment[]
  equipmentsToShopImages?: UploadFile<FileResponse>[]

  equipmentsToWarehouse?: SimplifiedRelocationTaskEquipment[]
  equipmentsToWarehouseByFile?: EquipmentByFileTableRow[]
  equipmentsToWarehouseImages?: UploadFile<FileResponse>[]
}
