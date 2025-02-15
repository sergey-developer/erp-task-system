import { NomenclaturesGroupDTO } from 'features/nomenclatures/api/dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureGroup = (): NomenclaturesGroupDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
