import { AttachmentModel } from 'features/attachment/models'
import { UserModel } from 'features/user/models'
import { RelocationTaskStatusEnum } from 'features/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { ExternalRelocationModel } from '../relocationTask'

export type EquipmentRelocationHistoryAttachmentModel = Pick<
  AttachmentModel,
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
