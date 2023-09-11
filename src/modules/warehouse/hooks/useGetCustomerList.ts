import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getCustomerListMessages } from 'modules/warehouse/constants'
import { GetCustomerListQueryArgs, GetCustomerListSuccessResponse } from 'modules/warehouse/models'
import { useGetCustomerListQuery } from 'modules/warehouse/services/customerApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
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
      showErrorNotification(getCustomerListMessages.commonError)
    }
  }, [state.error])

  return state
}
