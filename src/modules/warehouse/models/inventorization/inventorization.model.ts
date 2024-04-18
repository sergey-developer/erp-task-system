import { UserModel } from 'modules/user/models'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { WarehouseModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type InventorizationModel = {
  id: IdType
  type: InventorizationTypeEnum
  deadlineAt: string
  warehouses: Pick<WarehouseModel, 'id' | 'title'>[]
  executor: Pick<UserModel, 'id' | 'fullName'>
  status: InventorizationStatusEnum
  createdBy: Pick<UserModel, 'id' | 'fullName'>
  createdAt: string
}
