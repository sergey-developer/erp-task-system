import { SkipToken } from '@reduxjs/toolkit/query'
import { endpoints } from 'features/users/api/endpoints/users.endpoints'
import { GetUserMeCodeQueryArgs, GetUserMeCodeSuccessResponse } from 'features/users/api/schemas'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

type UseUserMeCodeStateResult = CustomUseQueryStateResult<
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse
>

export const useUserMeCodeState = (
  args?: GetUserMeCodeQueryArgs | SkipToken,
): UseUserMeCodeStateResult => endpoints.getUserMeCode.useQueryState(args)
