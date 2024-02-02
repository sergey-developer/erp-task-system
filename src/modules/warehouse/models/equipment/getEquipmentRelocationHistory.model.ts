import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { EquipmentRelocationHistoryModel } from 'modules/warehouse/models'
import { EquipmentRequestArgs } from 'modules/warehouse/types'

export type GetEquipmentRelocationHistoryQueryArgs = EquipmentRequestArgs &
  Partial<{
    statuses: RelocationTaskStatusEnum[]
  }>

export type GetEquipmentRelocationHistorySuccessResponse = EquipmentRelocationHistoryModel
