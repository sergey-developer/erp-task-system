import { CurrencyModel } from 'modules/warehouse/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const currency = (): CurrencyModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})
