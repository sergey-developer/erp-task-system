import times from 'lodash/times'

import { TimeZoneListItemModel, TimeZonesCatalogModel } from 'shared/catalogs/api/dto/timeZones'

import { fakeWord } from '_tests_/utils'

export const timeZoneListItem = (): TimeZoneListItemModel => ({
  name: fakeWord(),
  label: fakeWord(),
  value: fakeWord(),
})

export const timeZoneList = (length: number = 1): TimeZonesCatalogModel =>
  times(length, () => timeZoneListItem())
