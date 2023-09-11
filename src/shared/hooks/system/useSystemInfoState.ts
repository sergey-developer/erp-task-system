import { SkipToken } from '@reduxjs/toolkit/query'

import { GetSystemInfoQueryArgs } from 'shared/models/system'
import { endpoints } from 'shared/services/systemApi.service'

export const useSystemInfoState = (args?: GetSystemInfoQueryArgs | SkipToken) =>
  endpoints.getSystemInfo.useQueryState(args)
