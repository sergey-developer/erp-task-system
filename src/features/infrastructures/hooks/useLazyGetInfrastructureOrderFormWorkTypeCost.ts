import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInfrastructureOrderFormWorkTypeCostErrorMessage } from '../api/constants'
import { useLazyGetInfrastructureOrderFormWorkTypeCostQuery } from '../api/endpoints/infrastructures.endpoints'
import {
  GetInfrastructureOrderFormWorkTypeCostRequest,
  GetInfrastructureOrderFormWorkTypeCostResponse,
} from '../api/schemas'

type UseGetInfrastructureOrderFormWorkTypeCostResult = CustomUseLazyQueryHookResult<
  GetInfrastructureOrderFormWorkTypeCostRequest,
  GetInfrastructureOrderFormWorkTypeCostResponse
>

export const useLazyGetInfrastructureOrderFormWorkTypeCost =
  (): UseGetInfrastructureOrderFormWorkTypeCostResult => {
    const [trigger, state] = useLazyGetInfrastructureOrderFormWorkTypeCostQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isNotFoundError(state.error) || isForbiddenError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(getInfrastructureOrderFormWorkTypeCostErrorMessage)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
