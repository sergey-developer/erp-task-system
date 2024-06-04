import { InventorizationRequestArgs } from 'modules/warehouse/types'

export type UpdateInventorizationEquipmentMutationArgs = InventorizationRequestArgs &
  Partial<{
    quantityFact: number
    locationFact: number
  }>

export type UpdateInventorizationEquipmentSuccessResponse = Partial<{
  hasDiff: boolean
  isFilled: boolean
}>
