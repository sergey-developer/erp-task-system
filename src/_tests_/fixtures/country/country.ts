import { CountryModel } from 'shared/catalogs/models/countries'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const country = (): CountryModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
