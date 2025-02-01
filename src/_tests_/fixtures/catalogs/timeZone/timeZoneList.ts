import times from 'lodash/times'

import { TimeZoneCatalogItemDTO, TimeZonesCatalogDTO } from 'shared/catalogs/api/dto/timeZones'

import { fakeWord } from '_tests_/utils'

export const timeZoneListItem = (): TimeZoneCatalogItemDTO => ({
  name: fakeWord(),
  label: fakeWord(),
  value: fakeWord(),
})

export const timeZoneList = (length: number = 1): TimeZonesCatalogDTO =>
  times(length, () => timeZoneListItem())
