import { InventorizationEquipmentRequestArgs } from 'modules/warehouse/types'

import { MaybeNull } from 'shared/types/utils'

import { GetInventorizationEquipmentsQueryArgs } from './getInventorizationEquipments.model'
import { InventorizationEquipmentListItemModel } from './inventorizationEquipments.model'

export type UpdateInventorizationEquipmentMutationArgs = InventorizationEquipmentRequestArgs & {
  quantityFact: MaybeNull<number>
  locationFact: MaybeNull<number>
  locationFactOption: InventorizationEquipmentListItemModel['locationFact']
  isLocationFactUndefined: boolean
  getInventorizationEquipmentsArgs: GetInventorizationEquipmentsQueryArgs
}

export type UpdateInventorizationEquipmentSuccessResponse = Partial<{
  hasDiff: boolean
  isFilled: boolean
}>
