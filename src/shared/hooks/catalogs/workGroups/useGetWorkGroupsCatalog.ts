import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWorkGroupsCatalogErrMsg } from 'shared/constants/catalogs'
import {
  GetWorkGroupsCatalogQueryArgs,
  GetWorkGroupsCatalogSuccessResponse,
} from 'shared/models/catalogs/workGroups'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetWorkGroupsCatalogQuery } from 'shared/services/catalogsApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWorkGroupsCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetWorkGroupsCatalogQueryArgs>,
  GetWorkGroupsCatalogSuccessResponse
>

type UseGetWorkGroupsCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetWorkGroupsCatalogQueryArgs>,
  GetWorkGroupsCatalogSuccessResponse
>

export const useGetWorkGroupsCatalog = (
  args?: GetWorkGroupsCatalogQueryArgs,
  options?: UseGetWorkGroupsCatalogOptions,
): UseGetWorkGroupsCatalogResult => {
  const state = useGetWorkGroupsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWorkGroupsCatalogErrMsg)
    }
  }, [state.error])

  return state
}
