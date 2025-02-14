import { InventorizationDetailDTO } from '../api/dto'

export type ExecuteInventorizationPageLocationState = {
  inventorization: Pick<
    InventorizationDetailDTO,
    'id' | 'executor' | 'status' | 'type' | 'deadlineAt' | 'createdAt' | 'createdBy' | 'warehouses'
  >
}
