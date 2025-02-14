import { SkipToken } from '@reduxjs/toolkit/query'
import { endpoints } from 'features/users/api/endpoints/users.endpoints'
import { GetUserMeCodeRequest, GetUserMeCodeResponse } from 'features/users/api/schemas'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

type UseUserMeCodeStateResult = CustomUseQueryStateResult<
  GetUserMeCodeRequest,
  GetUserMeCodeResponse
>

export const useUserMeCodeState = (
  args?: GetUserMeCodeRequest | SkipToken,
): UseUserMeCodeStateResult => endpoints.getUserMeCode.useQueryState(args)
