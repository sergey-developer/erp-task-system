import { InventorizationEquipmentRequestArgs } from 'features/warehouse/types'

import { MaybeNull } from 'shared/types/utils'

import { GetInventorizationEquipmentsRequest } from './getInventorizationEquipments.model'
import { InventorizationEquipmentListItemModel } from './inventorizationEquipments.model'

export type UpdateInventorizationEquipmentRequest = InventorizationEquipmentRequestArgs & {
  quantityFact: MaybeNull<number>
  locationFact: MaybeNull<number>
  locationFactOption: InventorizationEquipmentListItemModel['locationFact']
  isLocationFactUndefined: boolean
  getInventorizationEquipmentsArgs: GetInventorizationEquipmentsRequest
}

export type UpdateInventorizationEquipmentResponse = Partial<{
  hasDiff: boolean
  isFilled: boolean
}>
