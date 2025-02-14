import { RelocationTaskStatusEnum } from 'features/warehouse/constants/relocationTask'

import { EquipmentRelocationHistoryDTO } from '../dto'
import { EquipmentRequestArgs } from '../types'

export type GetEquipmentRelocationHistoryRequest = EquipmentRequestArgs &
  Partial<{
    statuses: RelocationTaskStatusEnum[]
  }>

export type GetEquipmentRelocationHistoryResponse = EquipmentRelocationHistoryDTO
