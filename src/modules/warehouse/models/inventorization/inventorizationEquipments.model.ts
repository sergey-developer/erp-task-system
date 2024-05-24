import { EquipmentModel } from 'modules/warehouse/models'

import { LocationModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'
import { MaybeNull, SetNonNullable } from 'shared/types/utils'

export type InventorizationEquipmentListItemModel = {
  id: IdType
  equipment: SetNonNullable<
    EquipmentModel,
    'id' | 'title' | 'category' | 'serialNumber' | 'inventoryNumber'
  >
  locationPlan: LocationModel
  locationFact: MaybeNull<LocationModel>
  quantity: {
    plan: number
    fact: MaybeNull<number>
    diff: MaybeNull<number>
  }
  isFilled: boolean
  hasDiff: MaybeNull<boolean>
}

export type InventorizationEquipmentsModel = InventorizationEquipmentListItemModel[]
