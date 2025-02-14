import { EquipmentDetailDTO } from 'features/warehouse/models'

import { LocationCatalogItemDTO } from 'shared/catalogs/api/dto/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InventorizationEquipmentListItemModel = {
  id: IdType
  equipment: Pick<
    EquipmentDetailDTO,
    'id' | 'title' | 'category' | 'serialNumber' | 'inventoryNumber'
  >
  isLocationFactUndefined: boolean
  locationPlan: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
  locationFact: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
  quantity: {
    plan: number
    fact: MaybeNull<number>
    diff: MaybeNull<number>
  }
  isFilled: boolean
  hasDiff: MaybeNull<boolean>
}

export type InventorizationEquipmentsModel = InventorizationEquipmentListItemModel[]
