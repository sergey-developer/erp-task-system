import { CountryCatalogItemDTO } from 'shared/catalogs/countries/api/dto/countriesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const country = (): CountryCatalogItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
})
