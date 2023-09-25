import { NomenclatureGroupListItemModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureGroupListItem =
  (): NomenclatureGroupListItemModel => ({
    id: fakeId(),
    title: fakeWord(),
  })
