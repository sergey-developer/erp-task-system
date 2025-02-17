import times from 'lodash/times'

import { CustomerCatalogItemDTO, CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'

import { fakeInteger, fakeWord } from '_tests_/helpers'

export const customerCatalogItem = (): CustomerCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const customersCatalog = (length: number = 1): CustomersCatalogDTO =>
  times(length, () => customerCatalogItem())
