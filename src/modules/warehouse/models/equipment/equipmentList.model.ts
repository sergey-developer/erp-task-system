import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import { WarehouseModel } from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type EquipmentListItemModel = {
  id: number
  title: string
  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  warehouse: MaybeNull<Pick<WarehouseModel, 'id' | 'title'>>
  condition: EquipmentConditionEnum
  quantity: number

  // todo: исп-ть тип EquipmentCategory как будет готова интеграция фильтров
  category: {
    id: number
    title: string
  }

  // todo: исп-ть тип WorkType как будет готова интеграция фильтров
  purpose: {
    id: number
    title: string
  }
}

export type EquipmentListModel = EquipmentListItemModel[]
