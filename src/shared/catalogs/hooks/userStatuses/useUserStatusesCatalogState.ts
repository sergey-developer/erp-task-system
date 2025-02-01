import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import {
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/userStatuses'
import { endpoints } from 'shared/catalogs/api/endpoints/userStatusesCatalog.endpoints'

type UseUserStatusesCatalogStateResult = CustomUseQueryStateResult<
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse
>

export const useUserStatusesCatalogState = (
  args?: GetUserStatusesCatalogQueryArgs | SkipToken,
): UseUserStatusesCatalogStateResult => endpoints.getUserStatusesCatalog.useQueryState(args)
