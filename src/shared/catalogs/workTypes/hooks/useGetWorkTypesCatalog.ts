import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getWorkTypesCatalogErrMsg } from '../api/constants'
import { useGetWorkTypesCatalogQuery } from '../api/endpoints/workTypesCatalog.endpoints'
import { GetWorkTypesCatalogRequest, GetWorkTypesCatalogResponse } from '../api/schemas'

type UseGetWorkTypesCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetWorkTypesCatalogRequest>,
  GetWorkTypesCatalogResponse
>

type UseGetWorkTypesCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetWorkTypesCatalogRequest>,
  GetWorkTypesCatalogResponse
>

export const useGetWorkTypesCatalog = (
  args?: GetWorkTypesCatalogRequest,
  options?: UseGetWorkTypesCatalogOptions,
): UseGetWorkTypesCatalogResult => {
  const state = useGetWorkTypesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWorkTypesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
