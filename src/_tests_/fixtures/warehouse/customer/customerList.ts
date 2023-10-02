import times from 'lodash/times'

import {
  CustomerListItemModel,
  CustomerListModel,
} from 'modules/warehouse/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const customerListItem = (): CustomerListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const customerList = (length: number = 1): CustomerListModel =>
  times(length, () => customerListItem())
