import pick from 'lodash/pick'

import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import { EquipmentModel } from 'modules/warehouse/models'

import userFixtures from 'fixtures/user'
import warehouseFixtures from 'fixtures/warehouse'

import { fakeDateString, fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const equipment = (
  props?: Partial<
    Pick<
      EquipmentModel,
      | 'id'
      | 'nomenclature'
      | 'category'
      | 'customerInventoryNumber'
      | 'inventoryNumber'
      | 'isNew'
      | 'isWarranty'
      | 'isRepaired'
      | 'usageCounter'
      | 'owner'
    >
  >,
): EquipmentModel => ({
  id: props?.id || fakeId(),
  nomenclature:
    props?.nomenclature ||
    pick(warehouseFixtures.nomenclature(), 'id', 'title', 'equipmentHasSerialNumber'),
  category: props?.category || pick(warehouseFixtures.equipmentCategory(), 'id', 'title', 'code'),
  isNew: props?.isNew || false,
  isWarranty: props?.isWarranty || false,
  isRepaired: props?.isRepaired || false,
  customerInventoryNumber: props?.customerInventoryNumber || fakeWord(),
  inventoryNumber: props?.inventoryNumber || fakeWord(),
  usageCounter: props?.usageCounter || fakeInteger(),
  owner: props?.owner || pick(warehouseFixtures.customer(), 'id', 'title'),

  title: fakeWord(),
  warehouse: pick(warehouseFixtures.warehouse(), 'id', 'title'),
  condition: EquipmentConditionEnum.Working,
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  measurementUnit: pick(warehouseFixtures.measurementUnit(), 'id', 'title'),
  purpose: pick(warehouseFixtures.workType(), 'id', 'title'),
  serialNumber: fakeWord(),
  quantity: fakeInteger(),
  price: fakeInteger(),
  currency: pick(warehouseFixtures.currency(), 'id', 'title'),
  comment: fakeWord(),
})
