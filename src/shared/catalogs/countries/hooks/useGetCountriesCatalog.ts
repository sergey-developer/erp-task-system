import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getCountriesCatalogErrorMessage } from '../api/constants'
import { useGetCountriesCatalogQuery } from '../api/endpoints/countriesCatalog.endpoints'
import { GetCountriesCatalogRequest, GetCountriesCatalogResponse } from '../api/schemas'

type UseGetCountriesCatalogResult = CustomUseQueryHookResult<
  GetCountriesCatalogRequest,
  GetCountriesCatalogResponse
>

type UseGetCountriesCatalogOptions = CustomUseQueryOptions<
  GetCountriesCatalogRequest,
  GetCountriesCatalogResponse
>

export const useGetCountriesCatalog = (
  args?: GetCountriesCatalogRequest,
  options?: UseGetCountriesCatalogOptions,
): UseGetCountriesCatalogResult => {
  const state = useGetCountriesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCountriesCatalogErrorMessage)
    }
  }, [state.error])

  return state
}
