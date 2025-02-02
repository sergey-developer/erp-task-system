import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { UserModel } from 'features/user/models'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/warehouse/constants/inventorization'
import { NomenclatureModel, WarehouseListItemModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationModel = {
  id: IdType
  type: InventorizationTypeEnum
  status: InventorizationStatusEnum
  deadlineAt: string
  createdAt: string
  warehouses: Pick<WarehouseListItemModel, 'id' | 'title'>[]
  executor: Pick<UserModel, 'id' | 'fullName'>
  createdBy: Pick<UserModel, 'id' | 'fullName'>
  nomenclatures: Array<Pick<NomenclatureModel, 'id' | 'title' | 'group'>>
  completedAt: MaybeNull<string>
  description: MaybeNull<string>
  attachments: MaybeNull<Pick<AttachmentDetailDTO, 'id' | 'name' | 'size' | 'url'>[]>
}
