import { InventorizationTypeEnum } from 'modules/warehouse/constants/inventorization'

import { IdType } from 'shared/types/common'

import { InventorizationModel } from './inventorization.model'

export type CreateInventorizationMutationArgs = {
  type: InventorizationTypeEnum
  warehouses: IdType[]
  deadlineAt: string
  executor: IdType
  description?: string
  attachments?: IdType[]
  nomenclatures?: IdType[]
}

export type CreateInventorizationSuccessResponse = Pick<
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
