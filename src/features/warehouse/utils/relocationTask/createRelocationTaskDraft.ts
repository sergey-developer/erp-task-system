import pick from 'lodash/pick'

import {
  CreateRelocationTaskDraftPageLocationState,
  ExecuteInventorizationPageLocationState,
} from 'features/warehouse/types'

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
