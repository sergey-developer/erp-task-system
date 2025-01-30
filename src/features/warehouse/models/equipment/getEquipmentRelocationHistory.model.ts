import { RelocationTaskStatusEnum } from 'features/warehouse/constants/relocationTask'
import { EquipmentRelocationHistoryModel } from 'features/warehouse/models'
import { EquipmentRequestArgs } from 'features/warehouse/types'

export type GetEquipmentRelocationHistoryQueryArgs = EquipmentRequestArgs &
  Partial<{
    statuses: RelocationTaskStatusEnum[]
  }>

export type GetEquipmentRelocationHistorySuccessResponse = EquipmentRelocationHistoryModel
