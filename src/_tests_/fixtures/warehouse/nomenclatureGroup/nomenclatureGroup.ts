import { NomenclaturesGroupDTO } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureGroup = (): NomenclaturesGroupDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
