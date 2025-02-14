import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'

export type CreateRelocationTaskITSMRequest = {
  taskId: IdType

  controller?: IdType
  comment?: string
  equipmentsToShop?: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum
    attachments?: IdType[]
    images?: IdType[]
  }[]
  equipmentsToWarehouse?: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum
    attachments?: IdType[]
    images?: IdType[]
  }[]
}

export type CreateRelocationTaskITSMResponse = void
