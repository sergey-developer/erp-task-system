import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'
import { RelocationTaskModel } from 'features/warehouse/models'

export type EditRelocationTaskDraftPageLocationState = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
> & { relocationTask: RelocationTaskModel }
