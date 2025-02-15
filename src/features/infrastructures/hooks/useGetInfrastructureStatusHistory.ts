import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInfrastructureStatusHistoryErrorMessage } from '../api/constants'
import { useGetInfrastructureStatusHistoryQuery } from '../api/endpoints/infrastructures.endpoints'
import {
  GetInfrastructureOrdersFormsRequest,
  GetInfrastructureStatusHistoryRequest,
  GetInfrastructureStatusHistoryResponse,
} from '../api/schemas'

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
