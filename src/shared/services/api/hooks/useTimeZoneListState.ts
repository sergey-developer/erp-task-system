import { SkipToken } from '@reduxjs/toolkit/query'

import { baseApiEndpoints } from '../api.service'
import { GetTimeZoneListQueryArgs } from '../models'

export const useTimeZoneListState = (
  args?: GetTimeZoneListQueryArgs | SkipToken,
) => {
  return baseApiEndpoints.getTimeZoneList.useQueryState(args)
}
