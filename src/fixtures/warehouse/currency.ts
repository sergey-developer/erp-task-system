import { CurrencyModel } from 'modules/currency/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currency = (): CurrencyModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
