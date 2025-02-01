import { CountryCatalogItemDTO } from 'shared/catalogs/api/dto/countries'

import { fakeId, fakeWord } from '_tests_/utils'

export const countryListItem = (): CountryCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
