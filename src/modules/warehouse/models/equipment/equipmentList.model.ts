import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCategoryModel, WorkTypeModel } from 'modules/warehouse/models'

import { LocationModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentListItemModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  category: Pick<EquipmentCategoryModel, 'id' | 'title'>
  purpose: Pick<WorkTypeModel, 'id' | 'title'>
  isCredited: boolean

  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  location: MaybeNull<Pick<LocationModel, 'id' | 'title'>>
}

export type EquipmentListModel = EquipmentListItemModel[]
