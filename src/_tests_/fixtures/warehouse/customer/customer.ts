import { CustomerCatalogItemDTO } from 'shared/catalogs/customers/api/dto'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const customer = (): CustomerCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})
