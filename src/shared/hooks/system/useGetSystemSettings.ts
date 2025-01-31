import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getSystemSettingsErrMsg } from 'shared/constants/system/messages'
import { GetSystemSettingsQueryArgs, GetSystemSettingsSuccessResponse } from 'shared/models/system'
import { useGetSystemSettingsQuery } from 'shared/services/systemApi.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSystemSettingsResult = CustomUseQueryHookResult<
  GetSystemSettingsQueryArgs,
  GetSystemSettingsSuccessResponse
>

type UseGetSystemSettingsOptions = CustomUseQueryOptions<
  GetSystemSettingsQueryArgs,
  GetSystemSettingsSuccessResponse
>

export const useGetSystemSettings = (
  args?: GetSystemSettingsQueryArgs,
  options?: UseGetSystemSettingsOptions,
): UseGetSystemSettingsResult => {
  const state = useGetSystemSettingsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSystemSettingsErrMsg)
    }
  }, [state.error])

  return state
}
