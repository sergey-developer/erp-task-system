import { SkipToken } from '@reduxjs/toolkit/query'

import { GetTimeZoneListQueryArgs } from 'shared/catalogs/api/dto/timeZones'
import { endpoints } from 'shared/catalogs/api/endpoints/timeZonesCatalog.endpoints'

export const useTimeZoneListState = (args?: GetTimeZoneListQueryArgs | SkipToken) =>
  endpoints.getTimeZonesCatalog.useQueryState(args)
