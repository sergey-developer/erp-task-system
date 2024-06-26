import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getSystemInfoErrMsg } from 'shared/constants/system/messages'
import { GetSystemInfoQueryArgs, GetSystemInfoSuccessResponse } from 'shared/models/system'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetSystemInfoQuery } from 'shared/services/systemApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSystemInfoResult = CustomUseQueryHookResult<
  GetSystemInfoQueryArgs,
  GetSystemInfoSuccessResponse
>

type UseGetSystemInfoOptions = CustomUseQueryOptions<
  GetSystemInfoQueryArgs,
  GetSystemInfoSuccessResponse
>

export const useGetSystemInfo = (
  args?: GetSystemInfoQueryArgs,
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
