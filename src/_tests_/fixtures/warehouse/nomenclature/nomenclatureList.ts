import { NomenclatureListItemModel } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureListItem = (): NomenclatureListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  vendorCode: fakeWord(),
})
