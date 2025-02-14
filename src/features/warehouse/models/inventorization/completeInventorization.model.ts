import { InventorizationRequestArgs } from 'features/warehouse/types'

import { SetNonNullable } from 'shared/types/utils'

import { InventorizationModel } from './inventorization.model'

export type CompleteInventorizationRequest = InventorizationRequestArgs

export type CompleteInventorizationResponse = SetNonNullable<
  InventorizationModel,
  'status' | 'completedAt'
>
