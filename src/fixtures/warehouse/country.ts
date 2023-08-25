import { CountryModel } from 'modules/warehouse/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const country = (): CountryModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
