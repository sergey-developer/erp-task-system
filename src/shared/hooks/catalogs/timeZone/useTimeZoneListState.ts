import { SkipToken } from '@reduxjs/toolkit/query'

import { GetTimeZoneListQueryArgs } from 'shared/models/catalogs/timeZone'
import { endpoints } from 'shared/services/catalogsApi.service'

export const useTimeZoneListState = (args?: GetTimeZoneListQueryArgs | SkipToken) =>
  endpoints.getTimeZoneList.useQueryState(args)
