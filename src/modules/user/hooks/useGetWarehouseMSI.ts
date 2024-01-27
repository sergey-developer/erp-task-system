import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWarehouseMSIErrorMsg } from 'modules/user/constants'
import { GetWarehouseMSIQueryArgs, GetWarehouseMSISuccessResponse } from 'modules/user/models'
import { useGetWarehouseMSIQuery } from 'modules/user/services/userApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
        showErrorNotification(getWarehouseMSIErrorMsg)
      }
    }
  }, [state.error])

  return state
}
