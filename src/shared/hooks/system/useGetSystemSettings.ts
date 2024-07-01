import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getSystemSettingsErrMsg } from 'shared/constants/system/messages'
import { GetSystemSettingsQueryArgs, GetSystemSettingsSuccessResponse } from 'shared/models/system'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetSystemSettingsQuery } from 'shared/services/systemApi.service'
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
