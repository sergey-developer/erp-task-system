import { CountryModel } from 'modules/country/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const country = (): CountryModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
