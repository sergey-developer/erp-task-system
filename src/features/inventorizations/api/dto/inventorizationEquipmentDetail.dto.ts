import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoryDTO } from 'features/equipments/api/dto'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/currencies/api/dto'
import { LocationCatalogItemDTO } from 'shared/catalogs/locations/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationEquipmentDetailDTO = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  category: Pick<EquipmentCategoryDTO, 'id' | 'title' | 'code'>
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
