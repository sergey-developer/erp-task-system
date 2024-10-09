import { EquipmentModel } from 'modules/warehouse/models'

import { LocationCatalogListItemModel } from 'shared/models/catalogs/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationEquipmentListItemModel = {
  id: IdType
  equipment: Pick<EquipmentModel, 'id' | 'title' | 'category' | 'serialNumber' | 'inventoryNumber'>
  isLocationFactUndefined: boolean
  locationPlan: MaybeNull<Pick<LocationCatalogListItemModel, 'id' | 'title'>>
  locationFact: MaybeNull<Pick<LocationCatalogListItemModel, 'id' | 'title'>>
  quantity: {
    plan: number
    fact: MaybeNull<number>
    diff: MaybeNull<number>
  }
  isFilled: boolean
  hasDiff: MaybeNull<boolean>
}

export type InventorizationEquipmentsModel = InventorizationEquipmentListItemModel[]
