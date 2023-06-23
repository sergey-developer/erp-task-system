import { SkipToken } from '@reduxjs/toolkit/query'

import { baseApiEndpoints } from '../baseApi.service'
import { GetSystemInfoQueryArgs } from '../models'

export const useSystemInfoState = (
  args?: GetSystemInfoQueryArgs | SkipToken,
) => {
  return baseApiEndpoints.getSystemInfo.useQueryState(args)
}
