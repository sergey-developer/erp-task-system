import { CountryCatalogItemDTO } from 'shared/catalogs/countries/api/dto/countriesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const countryListItem = (): CountryCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
