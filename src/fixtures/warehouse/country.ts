import { CountryModel } from 'shared/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const country = (): CountryModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
