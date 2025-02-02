import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getSystemSettingsErrMsg } from 'shared/system/api/constants/errorMessages'
import {
  GetSystemSettingsQueryArgs,
  GetSystemSettingsSuccessResponse,
} from 'shared/system/api/dto/systemSettings'
import { useGetSystemSettingsQuery } from 'shared/system/api/endpoints/systemApi.endpoints'
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
