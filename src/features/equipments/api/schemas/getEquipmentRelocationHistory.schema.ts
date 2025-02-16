import { RelocationTaskStatusEnum } from 'features/relocationTasks/api/constants'

import { EquipmentRelocationHistoryDTO } from '../dto'
import { RequestWithEquipment } from '../types'

export type GetEquipmentRelocationHistoryRequest = RequestWithEquipment &
  Partial<{
    statuses: RelocationTaskStatusEnum[]
  }>

export type GetEquipmentRelocationHistoryResponse = EquipmentRelocationHistoryDTO
