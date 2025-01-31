import times from 'lodash/times'

import { CurrenciesCatalogModel, CurrencyListItemModel } from 'shared/catalogs/api/dto/currencies'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currencyListItem = (): CurrencyListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const currencies = (length: number = 1): CurrenciesCatalogModel =>
  times(length, () => currencyListItem())
