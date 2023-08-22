import { EquipmentNomenclatureListItemModel } from 'modules/warehouse/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const equipmentNomenclatureListItem =
  (): EquipmentNomenclatureListItemModel => ({
    id: fakeId(),
    title: fakeWord(),
    quantity: fakeInteger(),
  })
