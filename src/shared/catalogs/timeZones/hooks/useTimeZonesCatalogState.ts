import { SkipToken } from '@reduxjs/toolkit/query'

import { endpoints } from '../api/endpoints/timeZonesCatalog.endpoints'
import { GetTimeZonesCatalogRequest } from '../api/schemas'

export const useTimeZonesCatalogState = (args?: GetTimeZonesCatalogRequest | SkipToken) =>
  endpoints.getTimeZonesCatalog.useQueryState(args)
