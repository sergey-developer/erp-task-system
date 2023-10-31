import times from 'lodash/times'

import { CurrencyListItemModel } from 'shared/models/currency'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currencyListItem = (): CurrencyListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const currencyList = (length: number = 1) => times(length, () => currencyListItem())
