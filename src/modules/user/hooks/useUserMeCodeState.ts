import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { GetUserMeCodeQueryArgs, GetUserMeCodeSuccessResponse } from 'modules/user/models'
import { endpoints } from 'modules/user/services/userApiService'

type UseUserMeCodeStateResult = CustomUseQueryStateResult<
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse
>

export const useUserMeCodeState = (
  args?: GetUserMeCodeQueryArgs | SkipToken,
): UseUserMeCodeStateResult => endpoints.getUserMeCode.useQueryState(args)
