import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { MaybeNull } from 'shared/types/utils'

export type UpdateInventorizationEquipmentMutationArgs = InventorizationRequestArgs &
  Partial<{
    quantityFact: number
    locationFact: MaybeNull<number>
  }>

export type UpdateInventorizationEquipmentSuccessResponse = Partial<{
  hasDiff: boolean
  isFilled: boolean
}>
