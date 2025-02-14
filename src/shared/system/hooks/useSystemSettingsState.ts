import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import {
  GetSystemSettingsRequest,
  GetSystemSettingsResponse,
} from 'shared/system/api/dto/systemSettings'
import { endpoints } from 'shared/system/api/endpoints/systemApi.endpoints'

type UseSystemSettingsStateResult = CustomUseQueryStateResult<
  GetSystemSettingsRequest,
  GetSystemSettingsResponse
>

export const useSystemSettingsState = (
  args?: GetSystemSettingsRequest | SkipToken,
): UseSystemSettingsStateResult => endpoints.getSystemSettings.useQueryState(args)
