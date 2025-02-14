import { getWarehouseMSIErrMsg } from 'features/users/api/constants'
import { useGetWarehouseMSIQuery } from 'features/users/api/endpoints/users.endpoints'
import {
  GetWarehouseMSIRequest,
  GetWarehouseMSIResponse,
} from 'features/users/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWarehouseMSIResult = CustomUseQueryHookResult<
  GetWarehouseMSIRequest,
  GetWarehouseMSIResponse
>

type UseGetWarehouseMSIOptions = CustomUseQueryOptions<
  GetWarehouseMSIRequest,
  GetWarehouseMSIResponse
>

export const useGetWarehouseMSI = (
  args: GetWarehouseMSIRequest,
  options?: UseGetWarehouseMSIOptions,
): UseGetWarehouseMSIResult => {
  const state = useGetWarehouseMSIQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getWarehouseMSIErrMsg)
      }
    }
  }, [state.error])

  return state
}
