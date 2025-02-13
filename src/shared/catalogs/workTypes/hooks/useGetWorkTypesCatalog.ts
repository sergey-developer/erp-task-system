import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getWorkTypesCatalogErrMsg } from '../api/constants'
import { useGetWorkTypesCatalogQuery } from '../api/endpoints/workTypesCatalog.endpoints'
import { GetWorkTypesCatalogQueryArgs, GetWorkTypesCatalogSuccessResponse } from '../api/schemas'

type UseGetWorkTypesCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetWorkTypesCatalogQueryArgs>,
  GetWorkTypesCatalogSuccessResponse
>

type UseGetWorkTypesCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetWorkTypesCatalogQueryArgs>,
  GetWorkTypesCatalogSuccessResponse
>

export const useGetWorkTypesCatalog = (
  args?: GetWorkTypesCatalogQueryArgs,
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
