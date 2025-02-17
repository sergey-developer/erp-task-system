import { CurrencyCatalogItemDTO } from 'shared/catalogs/currencies/api/dto/currenciesCatalog.dto'

import { fakeInteger, fakeWord } from '_tests_/helpers'

export const currencyCatalogItem = (): CurrencyCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})
