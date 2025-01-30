import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { GetUserMeQueryArgs, GetUserMeSuccessResponse } from 'features/user/models'
import { endpoints } from 'features/user/services/userApi.service'

type UseUserMeStateResult = CustomUseQueryStateResult<GetUserMeQueryArgs, GetUserMeSuccessResponse>

export const useUserMeState = (args?: GetUserMeQueryArgs | SkipToken): UseUserMeStateResult =>
  endpoints.getUserMe.useQueryState(args)
