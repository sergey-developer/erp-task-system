import { EquipmentNomenclatureDTO, EquipmentNomenclaturesDTO } from 'features/equipments/api/dto'
import times from 'lodash/times'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

import { nomenclatureGroup } from '../nomenclatureGroup'

export const equipmentNomenclatureListItem = (): EquipmentNomenclatureDTO => ({
  id: fakeId(),
  title: fakeWord(),
  quantity: fakeInteger(),
  group: nomenclatureGroup(),
})

export const equipmentNomenclatures = (length: number = 1): EquipmentNomenclaturesDTO =>
  times(length, () => equipmentNomenclatureListItem())
