import { CountryModel } from 'shared/models/country'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const country = (): CountryModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
