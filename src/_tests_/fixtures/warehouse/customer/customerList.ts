import { CustomerCatalogItemDTO, CustomersModel } from 'features/warehouse/models'
import times from 'lodash/times'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const customerListItem = (): CustomerCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const customerList = (length: number = 1): CustomersModel =>
  times(length, () => customerListItem())
