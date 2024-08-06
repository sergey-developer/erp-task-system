import pick from 'lodash/pick'

import {
  CreateRelocationTaskDraftPageLocationState,
  ExecuteInventorizationPageLocationState,
} from 'modules/warehouse/types'

export const makeCreateRelocationTaskDraftPageLocationState = (
  inventorization: ExecuteInventorizationPageLocationState['inventorization'],
): NonNullable<CreateRelocationTaskDraftPageLocationState> => ({
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
