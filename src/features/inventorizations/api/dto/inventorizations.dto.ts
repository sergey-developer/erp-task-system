import { UserDetailDTO } from 'features/users/api/dto'
import { WarehouseDetailDTO } from 'features/warehouses/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { InventorizationStatusEnum, InventorizationTypeEnum } from '../constants'

export type InventorizationDTO = {
  id: IdType
  type: InventorizationTypeEnum
  status: InventorizationStatusEnum
  deadlineAt: string
  createdAt: string
  warehouses: Pick<WarehouseDetailDTO, 'id' | 'title'>[]
  executor: Pick<UserDetailDTO, 'id' | 'fullName'>
  createdBy: Pick<UserDetailDTO, 'id' | 'fullName'>
  completedAt: MaybeNull<string>
  revisionReason: MaybeNull<string>
}

export type InventorizationsDTO = InventorizationDTO[]
