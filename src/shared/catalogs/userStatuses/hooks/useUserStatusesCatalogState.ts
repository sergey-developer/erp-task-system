import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { endpoints } from '../api/endpoints/userStatusesCatalog.endpoints'
import {
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse,
} from '../api/schemas'

type UseUserStatusesCatalogStateResult = CustomUseQueryStateResult<
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse
>

export const useUserStatusesCatalogState = (
  args?: GetUserStatusesCatalogQueryArgs | SkipToken,
): UseUserStatusesCatalogStateResult => endpoints.getUserStatusesCatalog.useQueryState(args)
