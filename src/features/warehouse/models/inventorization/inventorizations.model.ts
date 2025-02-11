import { UserDetailDTO } from 'features/users/api/dto'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/warehouse/constants/inventorization'
import { WarehouseModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationListItemModel = {
  id: IdType
  type: InventorizationTypeEnum
  status: InventorizationStatusEnum
  deadlineAt: string
  createdAt: string
  warehouses: Pick<WarehouseModel, 'id' | 'title'>[]
  executor: Pick<UserDetailDTO, 'id' | 'fullName'>
  createdBy: Pick<UserDetailDTO, 'id' | 'fullName'>
  completedAt: MaybeNull<string>
  revisionReason: MaybeNull<string>
}

export type InventorizationsModel = InventorizationListItemModel[]
