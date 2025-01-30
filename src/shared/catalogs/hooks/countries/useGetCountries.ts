import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetCountriesCatalogQuery } from 'shared/catalogs/api/endpoints/countriesCatalog'
import { getCountryCatalogErrMsg } from 'shared/catalogs/constants/messages'
import {
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse,
} from 'shared/catalogs/models/countries'
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
