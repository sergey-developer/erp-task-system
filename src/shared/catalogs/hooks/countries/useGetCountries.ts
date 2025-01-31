import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getCountryCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse,
} from 'shared/catalogs/api/dto/countries'
import { useGetCountriesCatalogQuery } from 'shared/catalogs/api/endpoints/countriesCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetCountryListResult = CustomUseQueryHookResult<
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse
>

type UseGetCountryListOptions = CustomUseQueryOptions<
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse
>

export const useGetCountries = (
  args?: GetCountryListQueryArgs,
  options?: UseGetCountryListOptions,
): UseGetCountryListResult => {
  const state = useGetCountriesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCountryCatalogErrMsg)
    }
  }, [state.error])

  return state
}
