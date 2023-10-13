import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationEquipmentListItemModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  purpose: string
  quantity: number
  category: Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>

  price: MaybeNull<number>
  currency: MaybeNull<number>
  serialNumber: MaybeNull<string>
}

export type RelocationEquipmentListModel = RelocationEquipmentListItemModel[]
