import { InventorizationEquipmentRequestArgs } from 'modules/warehouse/types'

import { MaybeNull } from 'shared/types/utils'

import { GetInventorizationEquipmentsQueryArgs } from './getInventorizationEquipments.model'

export type UpdateInventorizationEquipmentMutationArgs = InventorizationEquipmentRequestArgs & {
  quantityFact: MaybeNull<number>
  locationFact: MaybeNull<number>
  getInventorizationEquipmentsArgs: GetInventorizationEquipmentsQueryArgs
}

export type UpdateInventorizationEquipmentSuccessResponse = Partial<{
  hasDiff: boolean
  isFilled: boolean
}>
