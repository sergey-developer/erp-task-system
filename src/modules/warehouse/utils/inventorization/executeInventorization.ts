import pick from 'lodash/pick'

import { InventorizationModel } from 'modules/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'

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
