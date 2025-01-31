import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getInfrastructureOrderFormWorkTypeCostErrMsg } from 'features/infrastructures/constants'
import {
  GetInfrastructureOrderFormWorkTypeCostQueryArgs,
  GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
} from 'features/infrastructures/models'
import { useLazyGetInfrastructureOrderFormWorkTypeCostQuery } from 'features/infrastructures/services/infrastructuresApi.service'

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
