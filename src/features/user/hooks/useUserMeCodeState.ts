import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { GetUserMeCodeQueryArgs, GetUserMeCodeSuccessResponse } from 'features/user/models'
import { endpoints } from 'features/user/services/userApi.service'

type UseUserMeCodeStateResult = CustomUseQueryStateResult<
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse
>

export const useUserMeCodeState = (
  args?: GetUserMeCodeQueryArgs | SkipToken,
): UseUserMeCodeStateResult => endpoints.getUserMeCode.useQueryState(args)
