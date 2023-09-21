import { NomenclatureGroupModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureGroup = (): NomenclatureGroupModel => ({
  id: fakeId(),
  title: fakeWord(),
})
