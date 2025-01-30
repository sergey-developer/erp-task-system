import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetWorkGroupsCatalogQuery } from 'shared/catalogs/api/endpoints/workGroupsCatalog'
import { getWorkGroupsCatalogErrMsg } from 'shared/catalogs/constants'
import {
  GetWorkGroupsCatalogQueryArgs,
  GetWorkGroupsCatalogSuccessResponse,
} from 'shared/catalogs/models/workGroups'
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
