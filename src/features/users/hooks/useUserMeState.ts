import { SkipToken } from '@reduxjs/toolkit/query'
import { endpoints } from 'features/users/api/endpoints/users.endpoints'
import { GetUserMeRequest, GetUserMeResponse } from 'features/users/api/schemas'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

type UseUserMeStateResult = CustomUseQueryStateResult<GetUserMeRequest, GetUserMeResponse>

export const useUserMeState = (args?: GetUserMeRequest | SkipToken): UseUserMeStateResult =>
  endpoints.getUserMe.useQueryState(args)
