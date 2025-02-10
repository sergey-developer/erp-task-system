import { getWarehouseMSIErrMsg } from 'features/user/api/constants'
import { GetWarehouseMSIQueryArgs, GetWarehouseMSISuccessResponse } from 'features/user/api/dto'
import { useGetWarehouseMSIQuery } from 'features/user/api/endpoints/users.endpoints'
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
  GetWarehouseMSIQueryArgs,
  GetWarehouseMSISuccessResponse
>

type UseGetWarehouseMSIOptions = CustomUseQueryOptions<
  GetWarehouseMSIQueryArgs,
  GetWarehouseMSISuccessResponse
>

export const useGetWarehouseMSI = (
  args: GetWarehouseMSIQueryArgs,
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
