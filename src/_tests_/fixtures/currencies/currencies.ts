import times from 'lodash/times'

import {
  CurrenciesCatalogDTO,
  CurrencyCatalogItemDTO,
} from 'shared/catalogs/currencies/api/dto/currenciesCatalog.dto'

import { fakeInteger, fakeWord } from '_tests_/helpers'

export const currency = (): CurrencyCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const currencies = (length: number = 1): CurrenciesCatalogDTO =>
  times(length, () => currency())
