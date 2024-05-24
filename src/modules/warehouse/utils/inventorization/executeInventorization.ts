import pick from 'lodash/pick'

import { InventorizationModel } from 'modules/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'

export const getExecuteInventorizationPageLocationState = (
  inventorization: InventorizationModel,
): NonNullable<ExecuteInventorizationPageLocationState> =>
  pick(
    inventorization,
    'executor',
    'status',
    'type',
    'deadlineAt',
    'createdAt',
    'createdBy',
    'warehouses',
  )
