import { CurrencyModel } from 'shared/models/currency'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currency = (): CurrencyModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
