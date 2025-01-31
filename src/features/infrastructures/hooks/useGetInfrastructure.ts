import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInfrastructureErrMsg } from 'features/infrastructures/constants'
import {
  GetInfrastructureQueryArgs,
  GetInfrastructureSuccessResponse,
} from 'features/infrastructures/models'
import { useGetInfrastructureQuery } from 'features/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInfrastructureResult = CustomUseQueryHookResult<
  GetInfrastructureQueryArgs,
  GetInfrastructureSuccessResponse
>

type UseGetInfrastructureOptions = CustomUseQueryOptions<
  GetInfrastructureQueryArgs,
  GetInfrastructureSuccessResponse
>

export const useGetInfrastructure = (
  args: GetInfrastructureQueryArgs,
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
