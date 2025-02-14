import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'

import { RelocationTaskDetailDTO } from '../api/dto'

export type EditRelocationTaskDraftPageLocationState = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
> & { relocationTask: RelocationTaskDetailDTO }
