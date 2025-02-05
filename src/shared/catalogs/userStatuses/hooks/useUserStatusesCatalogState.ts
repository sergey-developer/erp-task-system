import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { endpoints } from 'shared/catalogs/userStatuses/api/endpoints/userStatusesCatalog.endpoints'
import {
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse,
} from 'shared/catalogs/userStatuses/api/schemas'

type UseUserStatusesCatalogStateResult = CustomUseQueryStateResult<
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse
>

export const useUserStatusesCatalogState = (
  args?: GetUserStatusesCatalogQueryArgs | SkipToken,
): UseUserStatusesCatalogStateResult => endpoints.getUserStatusesCatalog.useQueryState(args)
