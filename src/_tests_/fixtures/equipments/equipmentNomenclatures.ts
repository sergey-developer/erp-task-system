import { EquipmentNomenclatureDTO, EquipmentNomenclaturesDTO } from 'features/equipments/api/dto'
import times from 'lodash/times'

import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

import { nomenclatureGroup } from '../warehouse/nomenclatureGroup'

export const equipmentNomenclatureListItem = (): EquipmentNomenclatureDTO => ({
  id: fakeId(),
  title: fakeWord(),
  quantity: fakeInteger(),
  group: nomenclatureGroup(),
})

export const equipmentNomenclatures = (length: number = 1): EquipmentNomenclaturesDTO =>
  times(length, () => equipmentNomenclatureListItem())
