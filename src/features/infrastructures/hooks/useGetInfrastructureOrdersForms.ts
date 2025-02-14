import {
  GetInfrastructureOrdersFormsRequest,
  GetInfrastructureOrdersFormsResponse,
} from 'features/infrastructures/api/dto'
import { useGetInfrastructureOrdersFormsQuery } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { getInfrastructureOrdersFormsErrorMessage } from 'features/infrastructures/constants'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInfrastructureOrdersFormsResult = CustomUseQueryHookResult<
  GetInfrastructureOrdersFormsRequest,
  GetInfrastructureOrdersFormsResponse
>

type UseGetInfrastructureOrdersFormsOptions = CustomUseQueryOptions<
  GetInfrastructureOrdersFormsRequest,
  GetInfrastructureOrdersFormsResponse
>

export const useGetInfrastructureOrdersForms = (
  args: GetInfrastructureOrdersFormsRequest,
  options?: UseGetInfrastructureOrdersFormsOptions,
): UseGetInfrastructureOrdersFormsResult => {
  const state = useGetInfrastructureOrdersFormsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInfrastructureOrdersFormsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
