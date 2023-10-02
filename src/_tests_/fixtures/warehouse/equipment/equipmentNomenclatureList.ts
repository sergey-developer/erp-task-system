import times from 'lodash/times'

import {
  EquipmentNomenclatureListItemModel,
  EquipmentNomenclatureListModel,
} from 'modules/warehouse/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const equipmentNomenclatureListItem =
  (): EquipmentNomenclatureListItemModel => ({
    id: fakeId(),
    title: fakeWord(),
    quantity: fakeInteger(),
  })

export const equipmentNomenclatureList = (
  length: number = 1,
): EquipmentNomenclatureListModel =>
  times(length, () => equipmentNomenclatureListItem())
