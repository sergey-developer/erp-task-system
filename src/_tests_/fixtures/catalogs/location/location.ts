import { LocationModel } from 'shared/models/catalogs/location'

import { fakeId, fakeWord } from '_tests_/utils'

export const location = (): LocationModel => ({
  id: fakeId(),
  title: fakeWord(),
})
