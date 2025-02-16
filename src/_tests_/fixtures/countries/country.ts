import { CountryCatalogItemDTO } from 'shared/catalogs/countries/api/dto/countriesCatalog.dto'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const country = (): CountryCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})
