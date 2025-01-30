import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'features/warehouse/models'

import { CurrencyListItemModel } from 'shared/catalogs/models/currencies'
import { LocationCatalogListItemModel } from 'shared/catalogs/models/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationEquipmentModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  category: Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>
  locationPlan: Pick<LocationCatalogListItemModel, 'id' | 'title'>
  quantity: {
    plan: number
    fact: MaybeNull<number>
    diff: MaybeNull<number>
  }

  price: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyListItemModel, 'id' | 'title'>>
  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  locationFact: MaybeNull<Pick<LocationCatalogListItemModel, 'id' | 'title'>>
}
