import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentDetailDTO } from 'features/equipments/api/dto'
import isUndefined from 'lodash/isUndefined'
import pick from 'lodash/pick'

import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import userFixtures from '_tests_/fixtures/api/data/users'
import warehousesFixtures from '_tests_/fixtures/api/data/warehouses'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/helpers'

import nomenclaturesFixtures from '../nomenclatures'
import { equipmentCategory } from './equipmentCategories'

export const equipmentDetail = (
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
    pick(nomenclaturesFixtures.nomenclatureDetail(), 'id', 'title', 'equipmentHasSerialNumber'),
  category: props?.category || pick(equipmentCategory(), 'id', 'title', 'code'),
  isNew: props?.isNew || false,
  isWarranty: props?.isWarranty || false,
  isRepaired: props?.isRepaired || false,
  isCredited: props?.isCredited || false,
  inventoryNumber: props?.inventoryNumber || fakeWord(),
  usageCounter: props?.usageCounter || fakeInteger(),
  owner: isUndefined(props?.owner)
    ? pick(catalogsFixtures.customerCatalogItem(), 'id', 'title')
    : props?.owner!,
  macroregion: isUndefined(props?.macroregion)
    ? pick(catalogsFixtures.macroregionCatalogItem(), 'id', 'title')
    : props?.macroregion!,
  condition: isUndefined(props?.condition) ? EquipmentConditionEnum.Working : props!.condition,

  title: fakeWord(),
  location: pick(catalogsFixtures.locationCatalogItem(), 'id', 'title'),
  warehouse: pick(warehousesFixtures.warehouseDetail(), 'id', 'title'),
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.userDetail(), 'id', 'fullName'),
  measurementUnit: pick(catalogsFixtures.measurementUnitCatalogItem(), 'id', 'title'),
  purpose: pick(catalogsFixtures.workTypeDetail(), 'id', 'title'),
  serialNumber: fakeWord(),
  quantity: fakeInteger(),
  price: fakeInteger(),
  currency: pick(catalogsFixtures.currencyCatalogItem(), 'id', 'title'),
  comment: fakeWord(),
  amount: fakeInteger(),
  qrCode: fakeUrl(),
})
