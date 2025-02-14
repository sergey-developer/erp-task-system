import { IdType } from 'shared/types/common'

import { RequestWithInventorization } from '../types'

export type CreateInventorizationEquipmentRequest = RequestWithInventorization & {
  equipment: IdType
  locationFact: IdType
}

export type CreateInventorizationEquipmentResponse = void
