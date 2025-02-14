import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'
import { CreateRelocationTaskDraftPageLocationState } from 'features/warehouse/types'
import pick from 'lodash/pick'

export const makeCreateRelocationTaskDraftPageLocationState = ({
  inventorization,
}: Pick<
  ExecuteInventorizationPageLocationState,
  'inventorization'
>): NonNullable<CreateRelocationTaskDraftPageLocationState> => ({
  inventorization: pick(
    inventorization,
    'id',
    'executor',
    'status',
    'type',
    'deadlineAt',
    'createdAt',
    'createdBy',
    'warehouses',
  ),
})
