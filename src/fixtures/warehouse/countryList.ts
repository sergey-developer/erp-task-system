import { CountryListItemModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const countryListItem = (): CountryListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
})
