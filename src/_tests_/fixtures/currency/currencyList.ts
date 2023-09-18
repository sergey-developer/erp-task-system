import { CurrencyListItemModel } from 'shared/models/currency'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currencyListItem = (): CurrencyListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
