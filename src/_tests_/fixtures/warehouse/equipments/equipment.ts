import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentDetailDTO } from 'features/equipments/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currencies'
import macroregionFixtures from '_tests_/fixtures/macroregions'
import userFixtures from '_tests_/fixtures/users'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/helpers'

export const equipment = (
  props?: Partial<
    Pick<
      EquipmentDetailDTO,
      | 'id'
      | 'nomenclature'
      | 'category'
      | 'inventoryNumber'
      | 'isNew'
      | 'isWarranty'
      | 'isRepaired'
      | 'isCredited'
      | 'usageCounter'
      | 'owner'
      | 'macroregion'
      | 'condition'
    >
  >,
): EquipmentDetailDTO => ({
  id: props?.id || fakeId(),
  nomenclature:
    props?.nomenclature ||
    pick(warehouseFixtures.nomenclature(), 'id', 'title', 'equipmentHasSerialNumber'),
  category: props?.category || pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
  isNew: props?.isNew || false,
  isWarranty: props?.isWarranty || false,
  isRepaired: props?.isRepaired || false,
  isCredited: props?.isCredited || false,
  inventoryNumber: props?.inventoryNumber || fakeWord(),
  usageCounter: props?.usageCounter || fakeInteger(),
  owner: isUndefined(props?.owner)
    ? pick(warehouseFixtures.customer(), 'id', 'title')
    : props?.owner!,
  macroregion: isUndefined(props?.macroregion)
    ? pick(macroregionFixtures.macroregion(), 'id', 'title')
    : props?.macroregion!,
  condition: isUndefined(props?.condition) ? EquipmentConditionEnum.Working : props!.condition,

  title: fakeWord(),
  location: pick(catalogsFixtures.locationCatalogItem(), 'id', 'title'),
  warehouse: pick(warehouseFixtures.warehouse(), 'id', 'title'),
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.userDetail(), 'id', 'fullName'),
  measurementUnit: pick(warehouseFixtures.measurementUnit(), 'id', 'title'),
  purpose: pick(warehouseFixtures.workType(), 'id', 'title'),
  serialNumber: fakeWord(),
  quantity: fakeInteger(),
  price: fakeInteger(),
  currency: pick(currencyFixtures.currency(), 'id', 'title'),
  comment: fakeWord(),
  amount: fakeInteger(),
  qrCode: fakeUrl(),
})
