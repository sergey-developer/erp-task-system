import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type SimplifiedRelocationTaskFormEquipment = {
  rowId: number
  id: IdType
  quantity: number
  condition: EquipmentConditionEnum

  serialNumber?: string
  purpose?: string
  amount?: number
  category?: EquipmentModel['category']
}

export type SimplifiedRelocationTaskFormFields = {
  controller?: IdType
  comment?: string

  equipmentsToShop?: SimplifiedRelocationTaskFormEquipment[]
  equipmentsToWarehouse?: SimplifiedRelocationTaskFormEquipment[]
}
