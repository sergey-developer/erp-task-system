import { InventorizationModel } from 'modules/warehouse/models'

export type CreateRelocationTaskDraftPageLocationState = {
  inventorization: Pick<InventorizationModel, 'executor' | 'status'>
}
