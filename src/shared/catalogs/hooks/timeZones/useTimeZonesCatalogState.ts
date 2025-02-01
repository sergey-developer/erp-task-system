import { SkipToken } from '@reduxjs/toolkit/query'

import { GetTimeZonesCatalogQueryArgs } from 'shared/catalogs/api/dto/timeZones'
import { endpoints } from 'shared/catalogs/api/endpoints/timeZonesCatalog.endpoints'

export const useTimeZonesCatalogState = (args?: GetTimeZonesCatalogQueryArgs | SkipToken) =>
  endpoints.getTimeZonesCatalog.useQueryState(args)
