import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getCustomersErrMsg } from 'features/warehouse/constants/customer'
import { GetCustomerListQueryArgs, GetCustomerListSuccessResponse } from 'features/warehouse/models'
import { useGetCustomerListQuery } from 'features/warehouse/services/customerApiService'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetCustomerListResult = CustomUseQueryHookResult<
  GetCustomerListQueryArgs,
  GetCustomerListSuccessResponse
>

type UseGetCustomerListOptions = CustomUseQueryOptions<
  GetCustomerListQueryArgs,
  GetCustomerListSuccessResponse
>

export const useGetCustomerList = (
  args?: GetCustomerListQueryArgs,
  options?: UseGetCustomerListOptions,
): UseGetCustomerListResult => {
  const state = useGetCustomerListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCustomersErrMsg)
    }
  }, [state.error])

  return state
}
