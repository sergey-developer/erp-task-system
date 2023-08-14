import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import {
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse,
} from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

type UseUserMeStateResult = CustomUseQueryStateResult<
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse
>

export const useUserMeState = (
  args?: GetUserMeQueryArgs | SkipToken,
): UseUserMeStateResult => userApiEndpoints.getUserMe.useQueryState(args)
