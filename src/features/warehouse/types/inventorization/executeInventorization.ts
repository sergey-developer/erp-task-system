import { InventorizationModel } from 'features/warehouse/models'

export type ExecuteInventorizationPageLocationState = {
  inventorization: Pick<
    InventorizationModel,
    'id' | 'executor' | 'status' | 'type' | 'deadlineAt' | 'createdAt' | 'createdBy' | 'warehouses'
  >
}
