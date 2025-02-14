import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { endpoints } from '../api/endpoints/userStatusesCatalog.endpoints'
import { GetUserStatusesCatalogRequest, GetUserStatusesCatalogResponse } from '../api/schemas'

type UseUserStatusesCatalogStateResult = CustomUseQueryStateResult<
  GetUserStatusesCatalogRequest,
  GetUserStatusesCatalogResponse
>

export const useUserStatusesCatalogState = (
  args?: GetUserStatusesCatalogRequest | SkipToken,
): UseUserStatusesCatalogStateResult => endpoints.getUserStatusesCatalog.useQueryState(args)
