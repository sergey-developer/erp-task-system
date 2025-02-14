import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getSystemSettingsErrorMessage } from 'shared/system/api/constants/errorMessages'
import {
  GetSystemSettingsRequest,
  GetSystemSettingsResponse,
} from 'shared/system/api/dto/systemSettings'
import { useGetSystemSettingsQuery } from 'shared/system/api/endpoints/systemApi.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSystemSettingsResult = CustomUseQueryHookResult<
  GetSystemSettingsRequest,
  GetSystemSettingsResponse
>

type UseGetSystemSettingsOptions = CustomUseQueryOptions<
  GetSystemSettingsRequest,
  GetSystemSettingsResponse
>

export const useGetSystemSettings = (
  args?: GetSystemSettingsRequest,
  options?: UseGetSystemSettingsOptions,
): UseGetSystemSettingsResult => {
  const state = useGetSystemSettingsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSystemSettingsErrorMessage)
    }
  }, [state.error])

  return state
}
