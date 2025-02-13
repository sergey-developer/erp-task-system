import { CustomerCatalogItemDTO } from 'features/warehouse/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const customer = (): CustomerCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})
