import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { CheckedInventorizationEquipmentsTemplateItemDTO } from 'features/inventorizations/api/dto'
import isBoolean from 'lodash/isBoolean'
import isUndefined from 'lodash/isUndefined'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import equipmentsFixtures from '_tests_/fixtures/equipments'
import { fakeInteger, fakeWord } from '_tests_/helpers'

import nomenclaturesFixtures from '../nomenclatures'

export const checkedInventorizationEquipmentsTemplateItem = (
  props?: Partial<Pick<CheckedInventorizationEquipmentsTemplateItemDTO, 'isCredited' | 'category'>>,
): CheckedInventorizationEquipmentsTemplateItemDTO => ({
  isCredited: isBoolean(props?.isCredited) ? props!.isCredited : false,
  category: isUndefined(props?.category) ? equipmentsFixtures.equipmentCategory() : props!.category,

  quantityFact: fakeInteger(),
  title: fakeWord(),
  comment: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  currency: catalogsFixtures.currencyCatalogItem(),
  inventoryNumber: fakeWord(),
  locationFact: catalogsFixtures.locationCatalogItem(),
  isNew: false,
  isRepaired: false,
  isWarranty: false,
  macroregion: catalogsFixtures.macroregionCatalogItem(),
  nomenclature: nomenclaturesFixtures.nomenclatureDetail(),
  owner: catalogsFixtures.customerCatalogItem(),
  price: fakeInteger(),
  purpose: catalogsFixtures.workTypeCatalogItem(),
  serialNumber: fakeWord(),
  usageCounter: fakeInteger(),
})
