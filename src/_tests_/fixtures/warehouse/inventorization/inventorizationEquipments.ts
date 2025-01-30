import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  InventorizationEquipmentListItemModel,
  InventorizationEquipmentsModel,
} from 'features/warehouse/models'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeIdStr, fakeInteger, fakeWord } from '_tests_/utils'

export const inventorizationEquipmentListItem = (
  props?: Partial<
    Pick<
      InventorizationEquipmentListItemModel,
      | 'quantity'
      | 'isFilled'
      | 'hasDiff'
      | 'equipment'
      | 'locationFact'
      | 'locationPlan'
      | 'isLocationFactUndefined'
    >
  >,
): InventorizationEquipmentListItemModel => ({
  quantity: isUndefined(props?.quantity)
    ? { plan: fakeInteger(), fact: fakeInteger(), diff: fakeInteger() }
    : props!.quantity,
  isFilled: isUndefined(props?.isFilled) ? true : props!.isFilled,
  hasDiff: isUndefined(props?.hasDiff) ? true : props!.hasDiff,
  equipment: isUndefined(props?.equipment)
    ? {
        id: fakeId(),
        title: fakeWord(),
        serialNumber: fakeIdStr(),
        inventoryNumber: fakeIdStr(),
        category: pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
      }
    : props!.equipment,
  locationFact: isUndefined(props?.locationFact)
    ? catalogsFixtures.locationCatalogListItem()
    : props!.locationFact,
  locationPlan: isUndefined(props?.locationPlan)
    ? catalogsFixtures.locationCatalogListItem()
    : props!.locationPlan,
  isLocationFactUndefined: isUndefined(props?.isLocationFactUndefined)
    ? false
    : props!.isLocationFactUndefined,

  id: fakeId(),
})

export const inventorizationEquipments = (length: number = 1): InventorizationEquipmentsModel =>
  times(length, () => inventorizationEquipmentListItem())
