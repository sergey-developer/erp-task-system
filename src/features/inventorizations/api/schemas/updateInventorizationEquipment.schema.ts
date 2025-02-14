import { MaybeNull } from 'shared/types/utils'

import { InventorizationEquipmentDTO } from '../dto'
import { RequestWithInventorizationEquipment } from '../types'
import { GetInventorizationEquipmentsRequest } from './getInventorizationEquipments.schema'

export type UpdateInventorizationEquipmentRequest = RequestWithInventorizationEquipment & {
  quantityFact: MaybeNull<number>
  locationFact: MaybeNull<number>
  locationFactOption: InventorizationEquipmentDTO['locationFact']
  isLocationFactUndefined: boolean
  getInventorizationEquipmentsArgs: GetInventorizationEquipmentsRequest
}

export type UpdateInventorizationEquipmentResponse = Partial<{
  hasDiff: boolean
  isFilled: boolean
}>
