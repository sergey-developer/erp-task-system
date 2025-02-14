import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentDetailDTO } from 'features/warehouse/models'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import currencyFixtures from '_tests_/fixtures/currency'
import macroregionFixtures from '_tests_/fixtures/macroregion'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

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
    ? pick(macroregionFixtures.macroregionListItem(), 'id', 'title')
    : props?.macroregion!,
  condition: isUndefined(props?.condition) ? EquipmentConditionEnum.Working : props!.condition,

  title: fakeWord(),
  location: pick(catalogsFixtures.locationCatalogListItem(), 'id', 'title'),
  warehouse: pick(warehouseFixtures.warehouse(), 'id', 'title'),
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  measurementUnit: pick(warehouseFixtures.measurementUnit(), 'id', 'title'),
  purpose: pick(warehouseFixtures.workType(), 'id', 'title'),
  serialNumber: fakeWord(),
  quantity: fakeInteger(),
  price: fakeInteger(),
  currency: pick(currencyFixtures.currencyListItem(), 'id', 'title'),
  comment: fakeWord(),
  amount: fakeInteger(),
  qrCode: fakeUrl(),
})
