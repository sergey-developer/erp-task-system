import pick from 'lodash/pick'

import { InventorizationModel } from 'features/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'features/warehouse/types'

export const makeExecuteInventorizationPageLocationState = (
  inventorization: Pick<
    InventorizationModel,
    'id' | 'executor' | 'status' | 'type' | 'deadlineAt' | 'createdAt' | 'createdBy' | 'warehouses'
  >,
): NonNullable<ExecuteInventorizationPageLocationState> => ({
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
