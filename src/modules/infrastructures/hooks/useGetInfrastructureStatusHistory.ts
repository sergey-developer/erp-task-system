import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInfrastructureStatusHistoryErrMsg } from 'modules/infrastructures/constants'
import {
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureStatusHistoryQueryArgs,
  GetInfrastructureStatusHistorySuccessResponse,
} from 'modules/infrastructures/models'
import { useGetInfrastructureStatusHistoryQuery } from 'modules/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/baseApi'
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
