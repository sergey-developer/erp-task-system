import { InventorizationRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'

export type CreateInventorizationEquipmentMutationArgs = InventorizationRequestArgs & {
  equipment: IdType
  locationFact: IdType
}

export type CreateInventorizationEquipmentSuccessResponse = void
