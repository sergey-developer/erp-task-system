import times from 'lodash/times'

import { CurrenciesModel, CurrencyListItemModel } from 'shared/models/currency'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currencyListItem = (): CurrencyListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const currencies = (length: number = 1): CurrenciesModel =>
  times(length, () => currencyListItem())
