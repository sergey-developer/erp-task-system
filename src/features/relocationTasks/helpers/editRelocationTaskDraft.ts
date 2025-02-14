import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'

import { RelocationTaskDetailDTO } from '../api/dto'
import { EditRelocationTaskDraftPageLocationState } from '../types'

type MakeEditRelocationTaskDraftPageLocationStateFnParams = Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
> & { relocationTask: RelocationTaskDetailDTO }

export const makeEditRelocationTaskDraftPageLocationState = ({
  inventorization,
  relocationTask,
}: MakeEditRelocationTaskDraftPageLocationStateFnParams): NonNullable<EditRelocationTaskDraftPageLocationState> => ({
  inventorization,
  relocationTask,
})
