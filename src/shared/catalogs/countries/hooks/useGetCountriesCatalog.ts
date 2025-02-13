import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getCountriesCatalogErrMsg } from '../api/constants'
import { useGetCountriesCatalogQuery } from '../api/endpoints/countriesCatalog.endpoints'
import { GetCountriesCatalogQueryArgs, GetCountriesCatalogSuccessResponse } from '../api/schemas'

type UseGetCountriesCatalogResult = CustomUseQueryHookResult<
  GetCountriesCatalogQueryArgs,
  GetCountriesCatalogSuccessResponse
>

type UseGetCountriesCatalogOptions = CustomUseQueryOptions<
  GetCountriesCatalogQueryArgs,
  GetCountriesCatalogSuccessResponse
>

export const useGetCountriesCatalog = (
  args?: GetCountriesCatalogQueryArgs,
  options?: UseGetCountriesCatalogOptions,
): UseGetCountriesCatalogResult => {
  const state = useGetCountriesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCountriesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
