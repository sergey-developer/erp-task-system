import { RelocationEquipmentsModel } from 'features/warehouse/models'
import { RequestWithRelocationTask } from 'features/warehouse/types'

export type GetRelocationEquipmentListRequest = RequestWithRelocationTask
export type GetRelocationEquipmentListResponse = RelocationEquipmentsModel
