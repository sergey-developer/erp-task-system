import { InventorizationRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'

export type CreateInventorizationEquipmentRequest = InventorizationRequestArgs & {
  equipment: IdType
  locationFact: IdType
}

export type CreateInventorizationEquipmentResponse = void
