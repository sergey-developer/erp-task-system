import { SkipToken } from '@reduxjs/toolkit/query'

import { endpoints } from 'shared/catalogs/timeZones/api/endpoints/timeZonesCatalog.endpoints'
import { GetTimeZonesCatalogQueryArgs } from 'shared/catalogs/timeZones/api/schemas'

export const useTimeZonesCatalogState = (args?: GetTimeZonesCatalogQueryArgs | SkipToken) =>
  endpoints.getTimeZonesCatalog.useQueryState(args)
