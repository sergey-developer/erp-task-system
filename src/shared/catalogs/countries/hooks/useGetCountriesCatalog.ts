import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getCountriesCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetCountriesCatalogQueryArgs,
  GetCountriesCatalogSuccessResponse,
} from 'shared/catalogs/api/schemas'
import { useGetCountriesCatalogQuery } from 'shared/catalogs/countries/api/endpoints/countriesCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

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
