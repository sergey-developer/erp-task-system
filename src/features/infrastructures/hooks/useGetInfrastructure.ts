import {
  GetInfrastructureRequest,
  GetInfrastructureResponse,
} from 'features/infrastructures/api/dto'
import { useGetInfrastructureQuery } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { getInfrastructureErrMsg } from 'features/infrastructures/constants'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
        showErrorNotification(getInfrastructureErrMsg)
      }
    }
  }, [state.error])

  return state
}
