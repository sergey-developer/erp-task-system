import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import { endpoints } from 'shared/system/api/endpoints/systemApi.endpoints'
import { GetSystemSettingsRequest, GetSystemSettingsResponse } from 'shared/system/api/schemas'

type UseSystemSettingsStateResult = CustomUseQueryStateResult<
  GetSystemSettingsRequest,
  GetSystemSettingsResponse
>

export const useSystemSettingsState = (
  args?: GetSystemSettingsRequest | SkipToken,
): UseSystemSettingsStateResult => endpoints.getSystemSettings.useQueryState(args)
