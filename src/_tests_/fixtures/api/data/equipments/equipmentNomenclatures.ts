import { EquipmentNomenclatureDTO, EquipmentNomenclaturesDTO } from 'features/equipments/api/dto'
import times from 'lodash/times'

import nomenclaturesFixtures from '_tests_/fixtures/api/data/nomenclatures'
import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const equipmentNomenclatureListItem = (): EquipmentNomenclatureDTO => ({
  id: fakeId(),
  title: fakeWord(),
  quantity: fakeInteger(),
  group: nomenclaturesFixtures.nomenclatureGroup(),
})

export const equipmentNomenclatures = (length: number = 1): EquipmentNomenclaturesDTO =>
  times(length, () => equipmentNomenclatureListItem())
