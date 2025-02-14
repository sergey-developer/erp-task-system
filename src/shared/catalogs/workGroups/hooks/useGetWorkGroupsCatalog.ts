import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getWorkGroupsCatalogErrMsg } from '../api/constants'
import { useGetWorkGroupsCatalogQuery } from '../api/endpoints/workGroupsCatalog.endpoints'
import { GetWorkGroupsCatalogRequest, GetWorkGroupsCatalogResponse } from '../api/schemas'

type UseGetWorkGroupsCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetWorkGroupsCatalogRequest>,
  GetWorkGroupsCatalogResponse
>

type UseGetWorkGroupsCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetWorkGroupsCatalogRequest>,
  GetWorkGroupsCatalogResponse
>

export const useGetWorkGroupsCatalog = (
  args?: GetWorkGroupsCatalogRequest,
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
