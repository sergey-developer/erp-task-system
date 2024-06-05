import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { SetNonNullable } from 'shared/types/utils'

import { InventorizationModel } from './inventorization.model'

export type CompleteInventorizationMutationArgs = InventorizationRequestArgs

export type CompleteInventorizationSuccessResponse = SetNonNullable<
  InventorizationModel,
  'status' | 'completedAt'
>
