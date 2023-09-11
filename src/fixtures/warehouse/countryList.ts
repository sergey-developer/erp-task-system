import { CountryListItemModel } from 'shared/models/country'

import { fakeId, fakeWord } from '_tests_/utils'

export const countryListItem = (): CountryListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
