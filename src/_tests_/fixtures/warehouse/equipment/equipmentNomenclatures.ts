import { EquipmentNomenclatureDTO, EquipmentNomenclaturesModel } from 'features/warehouse/models'
import times from 'lodash/times'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

import { nomenclatureGroup } from '../nomenclatureGroup'

export const equipmentNomenclatureListItem = (): EquipmentNomenclatureDTO => ({
  id: fakeId(),
  title: fakeWord(),
  quantity: fakeInteger(),
  group: nomenclatureGroup(),
})

export const equipmentNomenclatures = (length: number = 1): EquipmentNomenclaturesModel =>
  times(length, () => equipmentNomenclatureListItem())
