import { UserModel } from 'modules/user/models'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { NomenclatureModel, WarehouseModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationModel = {
  id: IdType
  type: InventorizationTypeEnum
  status: InventorizationStatusEnum
  deadlineAt: string
  createdAt: string
  warehouses: Pick<WarehouseModel, 'id' | 'title'>[]
  executor: Pick<UserModel, 'id' | 'fullName'>
  createdBy: Pick<UserModel, 'id' | 'fullName'>
  completedAt: MaybeNull<string>
  nomenclatures: Array<Pick<NomenclatureModel, 'id' | 'title' | 'group'>>
}
