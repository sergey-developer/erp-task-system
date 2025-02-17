import { CountryCatalogItemDTO } from 'shared/catalogs/countries/api/dto/countriesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const countryCatalogItem = (): CountryCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
