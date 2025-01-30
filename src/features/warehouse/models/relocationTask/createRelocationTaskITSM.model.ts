import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'

export type CreateRelocationTaskITSMMutationArgs = {
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

export type CreateRelocationTaskITSMSuccessResponse = void
