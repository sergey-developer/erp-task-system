import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getCustomersCatalogErrMsg } from 'shared/catalogs/customers/api/constants'
import { showErrorNotification } from 'shared/utils/notifications'

import { useGetCustomersCatalogQuery } from '../api/endpoints/customersCatalog.endpoints'
import { GetCustomersCatalogQueryArgs, GetCustomersCatalogSuccessResponse } from '../api/schemas'

type UseGetCustomersCatalogResult = CustomUseQueryHookResult<
  GetCustomersCatalogQueryArgs,
  GetCustomersCatalogSuccessResponse
>

type UseGetCustomersCatalogOptions = CustomUseQueryOptions<
  GetCustomersCatalogQueryArgs,
  GetCustomersCatalogSuccessResponse
>

export const useGetCustomersCatalog = (
  args?: GetCustomersCatalogQueryArgs,
  options?: UseGetCustomersCatalogOptions,
): UseGetCustomersCatalogResult => {
  const state = useGetCustomersCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCustomersCatalogErrMsg)
    }
  }, [state.error])

  return state
}
