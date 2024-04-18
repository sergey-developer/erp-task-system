import times from 'lodash/times'

import {
  EquipmentNomenclatureListItemModel,
  EquipmentNomenclaturesModel,
} from 'modules/warehouse/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

import { nomenclatureGroup } from '../nomenclatureGroup'

export const equipmentNomenclatureListItem = (): EquipmentNomenclatureListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  quantity: fakeInteger(),
  group: nomenclatureGroup(),
})

export const equipmentNomenclatures = (length: number = 1): EquipmentNomenclaturesModel =>
  times(length, () => equipmentNomenclatureListItem())
