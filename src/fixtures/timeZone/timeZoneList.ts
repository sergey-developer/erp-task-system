import times from 'lodash/times'

import {
  TimeZoneListItemModel,
  TimeZoneListModel,
} from 'shared/services/api/models'

import { fakeWord } from '_tests_/utils'

export const timeZoneListItem = (): TimeZoneListItemModel => ({
  name: fakeWord(),
  label: fakeWord(),
  value: fakeWord(),
})

export const timeZoneList = (length: number = 1): TimeZoneListModel =>
  times(length, () => timeZoneListItem())
