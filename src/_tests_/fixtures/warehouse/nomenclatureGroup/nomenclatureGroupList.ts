import { NomenclaturesGroupDTO } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const nomenclatureGroupListItem = (): NomenclaturesGroupDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
