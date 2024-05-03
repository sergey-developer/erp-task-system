import { InventorizationModel } from 'modules/warehouse/models'

export type ExecuteInventorizationPageLocationState = Pick<
  InventorizationModel,
  'executor' | 'status'
>
