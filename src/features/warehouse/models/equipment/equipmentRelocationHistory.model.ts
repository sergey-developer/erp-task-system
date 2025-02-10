import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { UserModel } from 'features/user/api/dto'
import { RelocationTaskStatusEnum } from 'features/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { ExternalRelocationModel } from '../relocationTask'

export type EquipmentRelocationHistoryAttachmentModel = Pick<
  AttachmentDetailDTO,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  createdBy: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}

export type EquipmentRelocationHistoryItemModel = {
  id: IdType
  createdAt: string
  relocateFrom: string
  relocateTo: string
  createdBy: string
  status: RelocationTaskStatusEnum

  completedAt: MaybeNull<string>
  documents: MaybeNull<EquipmentRelocationHistoryAttachmentModel[]>
  externalRelocation: MaybeNull<Pick<ExternalRelocationModel, 'number'>>
}

export type EquipmentRelocationHistoryModel = EquipmentRelocationHistoryItemModel[]
