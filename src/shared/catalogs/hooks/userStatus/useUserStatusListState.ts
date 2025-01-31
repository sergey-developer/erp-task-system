import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/catalogs/api/dto/userStatuses'
import { endpoints } from 'shared/catalogs/api/endpoints/userStatusesCatalog.endpoints'

type UseUserStatusListStateResult = CustomUseQueryStateResult<
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse
>

export const useUserStatusListState = (
  args?: GetUserStatusListQueryArgs | SkipToken,
): UseUserStatusListStateResult => endpoints.getUserStatusesCatalog.useQueryState(args)
