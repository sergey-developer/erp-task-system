import { NomenclatureDTO } from 'features/nomenclatures/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const nomenclature = (): NomenclatureDTO => ({
  id: fakeId(),
  title: fakeWord(),
  vendorCode: fakeWord(),
})
