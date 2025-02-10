import {
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureStatusHistoryQueryArgs,
  GetInfrastructureStatusHistorySuccessResponse,
} from 'features/infrastructures/api/dto'
import { useGetInfrastructureStatusHistoryQuery } from 'features/infrastructures/api/infrastructures.endpoints'
import { getInfrastructureStatusHistoryErrMsg } from 'features/infrastructures/constants'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInfrastructureStatusHistoryResult = CustomUseQueryHookResult<
  GetInfrastructureStatusHistoryQueryArgs,
  GetInfrastructureStatusHistorySuccessResponse
>

type UseGetInfrastructureStatusHistoryOptions = CustomUseQueryOptions<
  GetInfrastructureStatusHistoryQueryArgs,
  GetInfrastructureStatusHistorySuccessResponse
>

export const useGetInfrastructureStatusHistory = (
  args: GetInfrastructureOrdersFormsQueryArgs,
  options?: UseGetInfrastructureStatusHistoryOptions,
): UseGetInfrastructureStatusHistoryResult => {
  const state = useGetInfrastructureStatusHistoryQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInfrastructureStatusHistoryErrMsg)
      }
    }
  }, [state.error])

  return state
}
