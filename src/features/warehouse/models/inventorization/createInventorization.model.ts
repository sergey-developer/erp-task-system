import { InventorizationTypeEnum } from 'features/warehouse/constants/inventorization'

import { IdType } from 'shared/types/common'

import { InventorizationModel } from './inventorization.model'

export type CreateInventorizationRequest = {
  type: InventorizationTypeEnum
  warehouses: IdType[]
  deadlineAt: string
  executor: IdType
  description?: string
  attachments?: IdType[]
  nomenclatures?: IdType[]
}

export type CreateInventorizationResponse = Pick<
  InventorizationModel,
  | 'id'
  | 'type'
  | 'deadlineAt'
  | 'warehouses'
  | 'executor'
  | 'status'
  | 'createdBy'
  | 'createdAt'
  | 'completedAt'
  | 'nomenclatures'
  | 'description'
>
