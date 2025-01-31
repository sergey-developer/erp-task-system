import { CountryListItemModel } from 'shared/catalogs/api/dto/countries'

import { fakeId, fakeWord } from '_tests_/utils'

export const countryListItem = (): CountryListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
