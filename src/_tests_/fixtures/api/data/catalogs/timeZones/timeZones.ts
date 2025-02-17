import times from 'lodash/times'

import {
  TimeZoneCatalogItemDTO,
  TimeZonesCatalogDTO,
} from 'shared/catalogs/timeZones/api/dto/timeZonesCatalog.dto'

import { fakeWord } from '_tests_/helpers'

export const timeZoneCatalogItem = (): TimeZoneCatalogItemDTO => ({
  name: fakeWord(),
  label: fakeWord(),
  value: fakeWord(),
})

export const timeZonesCatalog = (length: number = 1): TimeZonesCatalogDTO =>
  times(length, () => timeZoneCatalogItem())
