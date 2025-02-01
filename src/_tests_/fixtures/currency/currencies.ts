import times from 'lodash/times'

import { CurrenciesCatalogDTO, CurrencyCatalogItemDTO } from 'shared/catalogs/api/dto/currencies'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currencyListItem = (): CurrencyCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const currencies = (length: number = 1): CurrenciesCatalogDTO =>
  times(length, () => currencyListItem())
