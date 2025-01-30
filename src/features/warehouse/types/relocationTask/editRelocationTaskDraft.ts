import { RelocationTaskModel } from 'features/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'features/warehouse/types'

export type EditRelocationTaskDraftPageLocationState = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
> & { relocationTask: RelocationTaskModel }
