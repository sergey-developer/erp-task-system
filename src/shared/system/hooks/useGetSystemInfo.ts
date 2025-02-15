import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getSystemInfoErrorMessage } from 'shared/system/api/constants/errorMessages'
import { useGetSystemInfoQuery } from 'shared/system/api/endpoints/systemApi.endpoints'
import { GetSystemInfoRequest, GetSystemInfoResponse } from 'shared/system/api/schemas'
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
      showErrorNotification(getSystemInfoErrorMessage)
    }
  }, [state.error])

  return state
}
