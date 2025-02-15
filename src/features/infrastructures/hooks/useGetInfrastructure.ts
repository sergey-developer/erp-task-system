import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInfrastructureErrorMessage } from '../api/constants'
import { useGetInfrastructureQuery } from '../api/endpoints/infrastructures.endpoints'
import { GetInfrastructureRequest, GetInfrastructureResponse } from '../api/schemas'

type UseGetInfrastructureResult = CustomUseQueryHookResult<
  GetInfrastructureRequest,
  GetInfrastructureResponse
>

type UseGetInfrastructureOptions = CustomUseQueryOptions<
  GetInfrastructureRequest,
  GetInfrastructureResponse
>

export const useGetInfrastructure = (
  args: GetInfrastructureRequest,
  options?: UseGetInfrastructureOptions,
): UseGetInfrastructureResult => {
  const state = useGetInfrastructureQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInfrastructureErrorMessage)
      }
    }
  }, [state.error])

  return state
}
