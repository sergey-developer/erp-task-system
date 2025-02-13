import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getCustomersCatalogErrMsg } from 'shared/catalogs/customers/api/constants'
import { showErrorNotification } from 'shared/utils/notifications'

import { useLazyGetCustomersCatalogQuery } from '../api/endpoints/customersCatalog.endpoints'
import { GetCustomersCatalogQueryArgs, GetCustomersCatalogSuccessResponse } from '../api/schemas'

type UseLazyGetCustomersCatalogResult = CustomUseLazyQueryHookResult<
  GetCustomersCatalogQueryArgs,
  GetCustomersCatalogSuccessResponse
>

export const useLazyGetCustomersCatalog = (): UseLazyGetCustomersCatalogResult => {
  const [trigger, state] = useLazyGetCustomersCatalogQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCustomersCatalogErrMsg)
    }
  }, [state.error])

  return [trigger, state]
}
