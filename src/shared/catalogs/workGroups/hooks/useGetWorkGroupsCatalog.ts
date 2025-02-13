import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getWorkGroupsCatalogErrMsg } from '../api/constants'
import { useGetWorkGroupsCatalogQuery } from '../api/endpoints/workGroupsCatalog.endpoints'
import { GetWorkGroupsCatalogQueryArgs, GetWorkGroupsCatalogSuccessResponse } from '../api/schemas'

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
