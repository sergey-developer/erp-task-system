import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryModel, WorkTypeListItemModel } from 'features/warehouse/models'

import { LocationCatalogListItemModel } from 'shared/catalogs/api/dto/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentListItemModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  category: Pick<EquipmentCategoryModel, 'id' | 'title'>
  purpose: Pick<WorkTypeListItemModel, 'id' | 'title'>
  isCredited: boolean

  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  location: MaybeNull<Pick<LocationCatalogListItemModel, 'id' | 'title'>>
}

export type EquipmentListModel = EquipmentListItemModel[]
