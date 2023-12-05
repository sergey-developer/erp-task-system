import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

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
}

export type SimplifiedRelocationTaskFormFields = {
  controller?: IdType
  comment?: string

  equipmentsToShop?: SimplifiedRelocationTaskEquipment[]
  equipmentsToWarehouse?: SimplifiedRelocationTaskEquipment[]
}
