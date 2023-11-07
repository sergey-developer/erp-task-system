import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentRelocationHistoryItemModel = {
  id: IdType
  createdAt: string
  relocateFrom: string
  relocateTo: string
  createdBy: string
  status: RelocationTaskStatusEnum

  completedAt: MaybeNull<string>
}

export type EquipmentRelocationHistoryModel = EquipmentRelocationHistoryItemModel[]
