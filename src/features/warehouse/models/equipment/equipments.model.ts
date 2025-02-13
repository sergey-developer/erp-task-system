import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryModel, WorkTypesCatalogItemDTO } from 'features/warehouse/models'

import { LocationCatalogItemDTO } from 'shared/catalogs/api/dto/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentListItemModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  category: Pick<EquipmentCategoryModel, 'id' | 'title'>
  purpose: Pick<WorkTypesCatalogItemDTO, 'id' | 'title'>
  isCredited: boolean

  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  location: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
}

export type EquipmentsModel = EquipmentListItemModel[]
