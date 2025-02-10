import { SkipToken } from '@reduxjs/toolkit/query'
import { GetUserMeQueryArgs, GetUserMeSuccessResponse } from 'features/user/api/dto'
import { endpoints } from 'features/user/api/endpoints/users.endpoints'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

type UseUserMeStateResult = CustomUseQueryStateResult<GetUserMeQueryArgs, GetUserMeSuccessResponse>

export const useUserMeState = (args?: GetUserMeQueryArgs | SkipToken): UseUserMeStateResult =>
  endpoints.getUserMe.useQueryState(args)
