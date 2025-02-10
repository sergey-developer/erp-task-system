import {
  GetInfrastructureOrderFormWorkTypeCostQueryArgs,
  GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
} from 'features/infrastructures/api/dto'
import { useLazyGetInfrastructureOrderFormWorkTypeCostQuery } from 'features/infrastructures/api/infrastructures.endpoints'
import { getInfrastructureOrderFormWorkTypeCostErrMsg } from 'features/infrastructures/constants'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
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
          showErrorNotification(getInfrastructureOrderFormWorkTypeCostErrMsg)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
