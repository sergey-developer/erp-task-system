import { InventorizationDetailDTO } from 'features/inventorizations/api/dto'
import { ExecuteInventorizationPageLocationState } from 'features/inventorizations/types'
import pick from 'lodash/pick'

export const makeExecuteInventorizationPageLocationState = (
  inventorization: Pick<
    InventorizationDetailDTO,
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
