import times from 'lodash/times'

import { CustomerCatalogItemDTO, CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'

import { fakeInteger, fakeWord } from '_tests_/helpers'

export const customerListItem = (): CustomerCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const customers = (length: number = 1): CustomersCatalogDTO =>
  times(length, () => customerListItem())
