import { CurrencyModel } from 'shared/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currency = (): CurrencyModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
