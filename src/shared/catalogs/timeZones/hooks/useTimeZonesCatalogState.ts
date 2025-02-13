import { SkipToken } from '@reduxjs/toolkit/query'

import { endpoints } from '../api/endpoints/timeZonesCatalog.endpoints'
import { GetTimeZonesCatalogQueryArgs } from '../api/schemas'

export const useTimeZonesCatalogState = (args?: GetTimeZonesCatalogQueryArgs | SkipToken) =>
  endpoints.getTimeZonesCatalog.useQueryState(args)
