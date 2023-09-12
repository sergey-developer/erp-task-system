import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { GetUserMeQueryArgs, GetUserMeSuccessResponse } from 'modules/user/models'
import { endpoints } from 'modules/user/services/userApiService'

type UseUserMeStateResult = CustomUseQueryStateResult<GetUserMeQueryArgs, GetUserMeSuccessResponse>

export const useUserMeState = (args?: GetUserMeQueryArgs | SkipToken): UseUserMeStateResult =>
  endpoints.getUserMe.useQueryState(args)
