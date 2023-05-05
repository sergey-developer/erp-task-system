import times from 'lodash/times'

import {
  TimeZoneListItemModel,
  TimeZoneListModel,
} from 'shared/services/api/models'

import { fakeWord } from '_tests_/utils'

export const fakeTimeZoneListItem = (): TimeZoneListItemModel => ({
  name: fakeWord(),
  label: fakeWord(),
  value: fakeWord(),
})

export const fakeTimeZoneList = (length: number = 1): TimeZoneListModel =>
  times(length, () => fakeTimeZoneListItem())
