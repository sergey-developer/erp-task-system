import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'modules/warehouse/models'

import { LocationModel } from 'shared/models/catalogs/location'
import { CurrencyModel } from 'shared/models/currency'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationEquipmentModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  category: Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>
  locationPlan: Pick<LocationModel, 'id' | 'title'>
  quantity: {
    plan: number
    fact: MaybeNull<number>
    diff: MaybeNull<number>
  }

  price: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyModel, 'id' | 'title'>>
  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  locationFact: MaybeNull<Pick<LocationModel, 'id' | 'title'>>
}
