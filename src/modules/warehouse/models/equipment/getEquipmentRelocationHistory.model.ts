import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { EquipmentRelocationHistoryModel } from 'modules/warehouse/models'
import { BaseEquipmentRequestArgs } from 'modules/warehouse/types'

export type GetEquipmentRelocationHistoryQueryArgs = BaseEquipmentRequestArgs &
  Partial<{
    statuses: RelocationTaskStatusEnum[]
  }>

export type GetEquipmentRelocationHistorySuccessResponse = EquipmentRelocationHistoryModel
