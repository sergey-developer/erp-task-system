import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

type UseUserStatusListStateResult = CustomUseQueryStateResult<
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse
>

export const useUserStatusListState = (
  args?: GetUserStatusListQueryArgs | SkipToken,
): UseUserStatusListStateResult =>
  userApiEndpoints.getUserStatusList.useQueryState(args)
