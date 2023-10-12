import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getCustomerListMessages } from 'modules/warehouse/constants/customer'
import { GetCustomerListQueryArgs, GetCustomerListSuccessResponse } from 'modules/warehouse/models'
import { useLazyGetCustomerListQuery } from 'modules/warehouse/services/customerApiService'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetCustomerListResult = CustomUseLazyQueryHookResult<
  GetCustomerListQueryArgs,
  GetCustomerListSuccessResponse
>

export const useLazyGetCustomerList = (): UseLazyGetCustomerListResult => {
  const [trigger, state] = useLazyGetCustomerListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCustomerListMessages.commonError)
    }
  }, [state.error])

  return [trigger, state]
}
