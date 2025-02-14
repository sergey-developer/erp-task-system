import {
  GetInfrastructureOrdersFormsRequest,
  GetInfrastructureStatusHistoryRequest,
  GetInfrastructureStatusHistoryResponse,
} from 'features/infrastructures/api/dto'
import { useGetInfrastructureStatusHistoryQuery } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { getInfrastructureStatusHistoryErrorMessage } from 'features/infrastructures/constants'
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
  GetInfrastructureStatusHistoryRequest,
  GetInfrastructureStatusHistoryResponse
>

type UseGetInfrastructureStatusHistoryOptions = CustomUseQueryOptions<
  GetInfrastructureStatusHistoryRequest,
  GetInfrastructureStatusHistoryResponse
>

export const useGetInfrastructureStatusHistory = (
  args: GetInfrastructureOrdersFormsRequest,
  options?: UseGetInfrastructureStatusHistoryOptions,
): UseGetInfrastructureStatusHistoryResult => {
  const state = useGetInfrastructureStatusHistoryQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInfrastructureStatusHistoryErrorMessage)
      }
    }
  }, [state.error])

  return state
}
