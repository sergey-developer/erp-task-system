import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'
import pick from 'lodash/pick'

import { CreateRelocationTaskDraftPageLocationState } from '../types'

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
