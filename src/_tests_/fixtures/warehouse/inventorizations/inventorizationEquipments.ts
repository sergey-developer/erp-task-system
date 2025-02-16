import {
  InventorizationEquipmentDTO,
  InventorizationEquipmentsDTO,
} from 'features/inventorizations/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'
import times from 'lodash/times'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeId, fakeIdStr, fakeInteger, fakeWord } from '_tests_/helpers'

export const inventorizationEquipmentListItem = (
  props?: Partial<
    Pick<
      InventorizationEquipmentDTO,
      | 'quantity'
      | 'isFilled'
      | 'hasDiff'
      | 'equipment'
      | 'locationFact'
      | 'locationPlan'
      | 'isLocationFactUndefined'
    >
  >,
): InventorizationEquipmentDTO => ({
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
    ? catalogsFixtures.locationCatalogItem()
    : props!.locationFact,
  locationPlan: isUndefined(props?.locationPlan)
    ? catalogsFixtures.locationCatalogItem()
    : props!.locationPlan,
  isLocationFactUndefined: isUndefined(props?.isLocationFactUndefined)
    ? false
    : props!.isLocationFactUndefined,

  id: fakeId(),
})

export const inventorizationEquipments = (length: number = 1): InventorizationEquipmentsDTO =>
  times(length, () => inventorizationEquipmentListItem())
