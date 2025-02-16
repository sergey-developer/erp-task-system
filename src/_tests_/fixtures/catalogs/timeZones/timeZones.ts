import times from 'lodash/times'

import {
  TimeZoneCatalogItemDTO,
  TimeZonesCatalogDTO,
} from 'shared/catalogs/timeZones/api/dto/timeZonesCatalog.dto'

import { fakeWord } from '_tests_/helpers'

export const timeZone = (): TimeZoneCatalogItemDTO => ({
  name: fakeWord(),
  label: fakeWord(),
  value: fakeWord(),
})

export const timeZones = (length: number = 1): TimeZonesCatalogDTO =>
  times(length, () => timeZone())
