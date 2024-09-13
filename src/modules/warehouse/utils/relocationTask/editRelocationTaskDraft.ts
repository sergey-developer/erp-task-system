import { RelocationTaskModel } from 'modules/warehouse/models'
import {
  EditRelocationTaskDraftPageLocationState,
  ExecuteInventorizationPageLocationState,
} from 'modules/warehouse/types'

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
