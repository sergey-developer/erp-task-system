import { useEffect } from 'react'

import {
  CustomUseQueryHookResult,
  CustomUseQueryOptions,
} from 'lib/rtk-query/types'

import { getCustomerListMessages } from 'modules/warehouse/constants'
import {
  GetCustomerListQueryArgs,
  GetCustomerListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetCustomerListQuery } from 'modules/warehouse/services/customerApi.service'

import { isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetCustomerListResult = CustomUseQueryHookResult<
  GetCustomerListQueryArgs,
  GetCustomerListSuccessResponse
>

export const useGetCustomerList = (
  args?: GetCustomerListQueryArgs,
  options?: CustomUseQueryOptions<
    GetCustomerListQueryArgs,
    GetCustomerListSuccessResponse
  >,
): UseGetCustomerListResult => {
  const state = useGetCustomerListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCustomerListMessages.commonError)
    }
  }, [state.error])

  return state
}
