import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { ExternalRelocationModel } from '../relocationTask'

export type EquipmentRelocationHistoryItemModel = {
  id: IdType
  createdAt: string
  relocateFrom: string
  relocateTo: string
  createdBy: string
  status: RelocationTaskStatusEnum

  completedAt: MaybeNull<string>
  externalRelocation: MaybeNull<Pick<ExternalRelocationModel, 'number'>>
}

export type EquipmentRelocationHistoryModel = EquipmentRelocationHistoryItemModel[]
