import { SkipToken } from '@reduxjs/toolkit/query'
import { endpoints } from 'features/users/api/endpoints/users.endpoints'
import { GetUserMeQueryArgs, GetUserMeSuccessResponse } from 'features/users/api/schemas'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

type UseUserMeStateResult = CustomUseQueryStateResult<GetUserMeQueryArgs, GetUserMeSuccessResponse>

export const useUserMeState = (args?: GetUserMeQueryArgs | SkipToken): UseUserMeStateResult =>
  endpoints.getUserMe.useQueryState(args)
