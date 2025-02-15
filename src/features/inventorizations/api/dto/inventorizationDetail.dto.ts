import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { NomenclatureDetailDTO } from 'features/nomenclatures/api/dto'
import { UserDetailDTO } from 'features/users/api/dto'
import { WarehouseDTO } from 'features/warehouses/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { InventorizationStatusEnum, InventorizationTypeEnum } from '../constants'

export type InventorizationDetailDTO = {
  id: IdType
  type: InventorizationTypeEnum
  status: InventorizationStatusEnum
  deadlineAt: string
  createdAt: string
  warehouses: Pick<WarehouseDTO, 'id' | 'title'>[]
  executor: Pick<UserDetailDTO, 'id' | 'fullName'>
  createdBy: Pick<UserDetailDTO, 'id' | 'fullName'>
  nomenclatures: Array<Pick<NomenclatureDetailDTO, 'id' | 'title' | 'group'>>
  completedAt: MaybeNull<string>
  description: MaybeNull<string>
  attachments: MaybeNull<Pick<AttachmentDetailDTO, 'id' | 'name' | 'size' | 'url'>[]>
}
