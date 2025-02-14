import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'
import { RelocationTaskModel } from 'features/warehouse/models'
import { EditRelocationTaskDraftPageLocationState } from 'features/warehouse/types'

type MakeEditRelocationTaskDraftPageLocationStateFnParams = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
> & { relocationTask: RelocationTaskModel }

export const makeEditRelocationTaskDraftPageLocationState = ({
  inventorization,
  relocationTask,
}: MakeEditRelocationTaskDraftPageLocationStateFnParams): NonNullable<EditRelocationTaskDraftPageLocationState> => ({
  inventorization,
  relocationTask,
})
