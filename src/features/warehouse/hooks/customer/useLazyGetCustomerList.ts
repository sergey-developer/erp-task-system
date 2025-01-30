import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getCustomersErrMsg } from 'features/warehouse/constants/customer'
import { GetCustomerListQueryArgs, GetCustomerListSuccessResponse } from 'features/warehouse/models'
import { useLazyGetCustomerListQuery } from 'features/warehouse/services/customerApiService'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetCustomerListResult = CustomUseLazyQueryHookResult<
  GetCustomerListQueryArgs,
  GetCustomerListSuccessResponse
>

export const useLazyGetCustomerList = (): UseLazyGetCustomerListResult => {
  const [trigger, state] = useLazyGetCustomerListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCustomersErrMsg)
    }
  }, [state.error])

  return [trigger, state]
}
