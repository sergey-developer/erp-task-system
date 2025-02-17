import { NomenclaturesGroupDTO } from 'features/nomenclatures/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const nomenclatureGroup = (): NomenclaturesGroupDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
