import times from 'lodash/times'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CheckedInventorizationEquipmentsTemplateListItemModel,
  CheckedInventorizationEquipmentsTemplateModel,
} from 'modules/warehouse/models'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currency'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeInteger, fakeWord } from '_tests_/utils'

export const checkedInventorizationEquipmentsTemplateListItem =
  (): CheckedInventorizationEquipmentsTemplateListItemModel => ({
    quantityFact: fakeInteger(),
    title: fakeWord(),
    category: warehouseFixtures.equipmentCategory(),
    comment: fakeWord(),
    condition: EquipmentConditionEnum.Working,
    currency: currencyFixtures.currencyListItem(),
    inventoryNumber: fakeWord(),
    locationFact: catalogsFixtures.locationCatalogListItem(),
    isCredited: false,
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
