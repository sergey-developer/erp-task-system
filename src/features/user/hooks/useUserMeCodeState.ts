import { SkipToken } from '@reduxjs/toolkit/query'
import { GetUserMeCodeQueryArgs, GetUserMeCodeSuccessResponse } from 'features/user/api/dto'
import { endpoints } from 'features/user/api/endpoints/users.endpoints'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

type UseUserMeCodeStateResult = CustomUseQueryStateResult<
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse
>

export const useUserMeCodeState = (
  args?: GetUserMeCodeQueryArgs | SkipToken,
): UseUserMeCodeStateResult => endpoints.getUserMeCode.useQueryState(args)
