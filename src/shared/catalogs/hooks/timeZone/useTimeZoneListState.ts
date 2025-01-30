import { SkipToken } from '@reduxjs/toolkit/query'

import { endpoints } from 'shared/catalogs/api/endpoints/timeZonesCatalog'
import { GetTimeZoneListQueryArgs } from 'shared/catalogs/models/timeZones'

export const useTimeZoneListState = (args?: GetTimeZoneListQueryArgs | SkipToken) =>
  endpoints.getTimeZonesCatalog.useQueryState(args)
