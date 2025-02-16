import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import {
  CheckedInventorizationEquipmentsTemplateDTO,
  CheckedInventorizationEquipmentsTemplateItemDTO,
} from 'features/inventorizations/api/dto'
import isBoolean from 'lodash/isBoolean'
import isUndefined from 'lodash/isUndefined'
import times from 'lodash/times'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currencies'
import macroregionFixtures from '_tests_/fixtures/macroregions'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeInteger, fakeWord } from '_tests_/helpers'

export const checkedInventorizationEquipmentsTemplateListItem = (
  props?: Partial<Pick<CheckedInventorizationEquipmentsTemplateItemDTO, 'isCredited' | 'category'>>,
): CheckedInventorizationEquipmentsTemplateItemDTO => ({
  isCredited: isBoolean(props?.isCredited) ? props!.isCredited : false,
  category: isUndefined(props?.category) ? warehouseFixtures.equipmentCategory() : props!.category,

  quantityFact: fakeInteger(),
  title: fakeWord(),
  comment: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  currency: currencyFixtures.currency(),
  inventoryNumber: fakeWord(),
  locationFact: catalogsFixtures.locationCatalogItem(),
  isNew: false,
  isRepaired: false,
  isWarranty: false,
  macroregion: macroregionFixtures.macroregion(),
  nomenclature: warehouseFixtures.nomenclature(),
  owner: warehouseFixtures.customerListItem(),
  price: fakeInteger(),
  purpose: warehouseFixtures.workTypeListItem(),
  serialNumber: fakeWord(),
  usageCounter: fakeInteger(),
})

export const checkedInventorizationEquipmentsTemplate = (
  length: number = 1,
): CheckedInventorizationEquipmentsTemplateDTO =>
  times(length, () => checkedInventorizationEquipmentsTemplateListItem())
