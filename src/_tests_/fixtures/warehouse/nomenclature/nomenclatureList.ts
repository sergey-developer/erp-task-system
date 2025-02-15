import { NomenclatureDTO } from 'features/nomenclatures/api/dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureListItem = (): NomenclatureDTO => ({
  id: fakeId(),
  title: fakeWord(),
  vendorCode: fakeWord(),
})
