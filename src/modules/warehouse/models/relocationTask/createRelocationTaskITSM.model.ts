import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

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
  }[]
  equipmentsToWarehouse?: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum
    attachments?: IdType[]
  }[]
}

export type CreateRelocationTaskITSMSuccessResponse = void
