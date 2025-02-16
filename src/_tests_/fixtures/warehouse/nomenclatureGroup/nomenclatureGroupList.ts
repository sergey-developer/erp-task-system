import { NomenclaturesGroupDTO } from 'features/nomenclatures/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const nomenclatureGroupListItem = (): NomenclaturesGroupDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
