import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import {
  EquipmentCategoryModel,
  WarehouseModel,
  WorkTypeModel,
} from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type EquipmentListItemModel = {
  id: number
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  category: Pick<EquipmentCategoryModel, 'id' | 'title'>
  purpose: Pick<WorkTypeModel, 'id' | 'title'>

  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  warehouse: MaybeNull<Pick<WarehouseModel, 'id' | 'title'>>
}

export type EquipmentListModel = EquipmentListItemModel[]
