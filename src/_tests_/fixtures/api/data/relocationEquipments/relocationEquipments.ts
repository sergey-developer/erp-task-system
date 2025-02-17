import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { RelocationEquipmentDTO } from 'features/relocationTasks/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const relocationEquipment = (): RelocationEquipmentDTO => ({
  id: fakeId(),
  relocationEquipmentId: fakeId(),
  title: fakeWord(),
  purpose: fakeWord(),
  quantity: fakeInteger(),
  condition: EquipmentConditionEnum.Working,
  serialNumber: fakeWord(),
  currency: catalogsFixtures.currencyCatalogItem(),
  price: fakeInteger(),
  category: pick(equipmentsFixtures.equipmentCategory(), 'id', 'title', 'code'),
})

export const relocationEquipments = (length: number = 1) =>
  times(length, () => relocationEquipment())
