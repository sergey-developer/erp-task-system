import { InventorizationEquipmentRequestArgs } from 'modules/warehouse/types'

import { MaybeNull } from 'shared/types/utils'

export type UpdateInventorizationEquipmentMutationArgs = InventorizationEquipmentRequestArgs & {
  quantityFact: MaybeNull<number>
  locationFact: MaybeNull<number>
}

export type UpdateInventorizationEquipmentSuccessResponse = Partial<{
  hasDiff: boolean
  isFilled: boolean
}>
