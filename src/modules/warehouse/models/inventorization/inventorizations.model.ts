import { UserModel } from 'modules/user/models'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { WarehouseModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationListItemModel = {
  id: IdType
  type: InventorizationTypeEnum
  status: InventorizationStatusEnum
  deadlineAt: string
  createdAt: string
  warehouses: Pick<WarehouseModel, 'id' | 'title'>[]
  executor: Pick<UserModel, 'id' | 'fullName'>
  createdBy: Pick<UserModel, 'id' | 'fullName'>
  completedAt: MaybeNull<string>
  revisionReason: MaybeNull<string>
}

export type InventorizationsModel = InventorizationListItemModel[]
