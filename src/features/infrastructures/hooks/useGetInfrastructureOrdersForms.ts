import {
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse,
} from 'features/infrastructures/api/dto'
import { useGetInfrastructureOrdersFormsQuery } from 'features/infrastructures/api/infrastructures.endpoints'
import { getInfrastructureOrdersFormsErrMsg } from 'features/infrastructures/constants'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInfrastructureOrdersFormsResult = CustomUseQueryHookResult<
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse
>

type UseGetInfrastructureOrdersFormsOptions = CustomUseQueryOptions<
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse
>

export const useGetInfrastructureOrdersForms = (
  args: GetInfrastructureOrdersFormsQueryArgs,
  options?: UseGetInfrastructureOrdersFormsOptions,
): UseGetInfrastructureOrdersFormsResult => {
  const state = useGetInfrastructureOrdersFormsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInfrastructureOrdersFormsErrMsg)
      }
    }
  }, [state.error])

  return state
}
