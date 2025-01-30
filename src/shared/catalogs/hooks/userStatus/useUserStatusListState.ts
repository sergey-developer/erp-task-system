import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { endpoints } from 'shared/catalogs/api/endpoints/userStatusesCatalog'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/catalogs/models/userStatuses'

type UseUserStatusListStateResult = CustomUseQueryStateResult<
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse
>

export const useUserStatusListState = (
  args?: GetUserStatusListQueryArgs | SkipToken,
): UseUserStatusListStateResult => endpoints.getUserStatusesCatalog.useQueryState(args)
