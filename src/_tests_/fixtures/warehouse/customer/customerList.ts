import times from 'lodash/times'

import { CustomerCatalogItemDTO, CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const customerListItem = (): CustomerCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const customerList = (length: number = 1): CustomersCatalogDTO =>
  times(length, () => customerListItem())
