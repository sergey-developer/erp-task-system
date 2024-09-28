import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  GetInfrastructureOrderFormWorkTypeCostQueryArgs,
  GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
} from 'modules/infrastructures/models'
import { useLazyGetInfrastructureOrderFormWorkTypeCostQuery } from 'modules/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInfrastructureOrderFormWorkTypeCostResult = CustomUseLazyQueryHookResult<
  GetInfrastructureOrderFormWorkTypeCostQueryArgs,
  GetInfrastructureOrderFormWorkTypeCostSuccessResponse
>

export const useLazyGetInfrastructureOrderFormWorkTypeCost =
  (): UseGetInfrastructureOrderFormWorkTypeCostResult => {
    const [trigger, state] = useLazyGetInfrastructureOrderFormWorkTypeCostQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isNotFoundError(state.error) || isForbiddenError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification('')
        }
      }
    }, [state.error])

    return [trigger, state]
  }
