import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getSystemInfoErrMsg } from 'shared/system/api/constants/errorMessages'
import { GetSystemInfoRequest, GetSystemInfoResponse } from 'shared/system/api/dto/systemInfo'
import { useGetSystemInfoQuery } from 'shared/system/api/endpoints/systemApi.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSystemInfoResult = CustomUseQueryHookResult<GetSystemInfoRequest, GetSystemInfoResponse>

type UseGetSystemInfoOptions = CustomUseQueryOptions<GetSystemInfoRequest, GetSystemInfoResponse>

export const useGetSystemInfo = (
  args?: GetSystemInfoRequest,
  options?: UseGetSystemInfoOptions,
): UseGetSystemInfoResult => {
  const state = useGetSystemInfoQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSystemInfoErrMsg)
    }
  }, [state.error])

  return state
}
