import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import {
  CheckedInventorizationEquipmentsTemplateItemDTO,
  CheckedInventorizationEquipmentsTemplateModel,
} from 'features/warehouse/models'
import isBoolean from 'lodash/isBoolean'
import isUndefined from 'lodash/isUndefined'
import times from 'lodash/times'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currency'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeInteger, fakeWord } from '_tests_/utils'

export const checkedInventorizationEquipmentsTemplateListItem = (
  props?: Partial<Pick<CheckedInventorizationEquipmentsTemplateItemDTO, 'isCredited' | 'category'>>,
): CheckedInventorizationEquipmentsTemplateItemDTO => ({
  isCredited: isBoolean(props?.isCredited) ? props!.isCredited : false,
  category: isUndefined(props?.category) ? warehouseFixtures.equipmentCategory() : props!.category,

  quantityFact: fakeInteger(),
  title: fakeWord(),
  comment: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  currency: currencyFixtures.currencyListItem(),
  inventoryNumber: fakeWord(),
  locationFact: catalogsFixtures.locationCatalogListItem(),
  isNew: false,
  isRepaired: false,
  isWarranty: false,
  macroregion: macroregionFixtures.macroregionListItem(),
  nomenclature: warehouseFixtures.nomenclature(),
  owner: warehouseFixtures.customerListItem(),
  price: fakeInteger(),
  purpose: warehouseFixtures.workTypeListItem(),
  serialNumber: fakeWord(),
  usageCounter: fakeInteger(),
})

export const checkedInventorizationEquipmentsTemplate = (
  length: number = 1,
): CheckedInventorizationEquipmentsTemplateModel =>
  times(length, () => checkedInventorizationEquipmentsTemplateListItem())
