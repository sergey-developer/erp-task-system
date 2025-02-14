import { SetNonNullable } from 'shared/types/utils'

import { InventorizationDetailDTO } from '../dto'
import { RequestWithInventorization } from '../types'

export type CompleteInventorizationRequest = RequestWithInventorization

export type CompleteInventorizationResponse = SetNonNullable<
  InventorizationDetailDTO,
  'status' | 'completedAt'
>
