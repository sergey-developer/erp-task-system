import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'features/warehouse/models'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/api/dto/currencies'
import { LocationCatalogItemDTO } from 'shared/catalogs/api/dto/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationEquipmentModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  category: Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>
  locationPlan: Pick<LocationCatalogItemDTO, 'id' | 'title'>
  quantity: {
    plan: number
    fact: MaybeNull<number>
    diff: MaybeNull<number>
  }

  price: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyCatalogItemDTO, 'id' | 'title'>>
  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  locationFact: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
}
