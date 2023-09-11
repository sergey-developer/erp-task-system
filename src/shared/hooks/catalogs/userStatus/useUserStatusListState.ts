import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/models/catalogs/userStatus'
import { endpoints } from 'shared/services/catalogsApi.service'

type UseUserStatusListStateResult = CustomUseQueryStateResult<
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse
>

export const useUserStatusListState = (
  args?: GetUserStatusListQueryArgs | SkipToken,
): UseUserStatusListStateResult => endpoints.getUserStatusList.useQueryState(args)
