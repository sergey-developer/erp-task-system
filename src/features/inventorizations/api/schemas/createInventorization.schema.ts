import { IdType } from 'shared/types/common'

import { InventorizationTypeEnum } from '../constants'
import { InventorizationDetailDTO } from '../dto'

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
  InventorizationDetailDTO,
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
