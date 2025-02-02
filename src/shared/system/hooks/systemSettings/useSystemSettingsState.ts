import { SkipToken } from '@reduxjs/toolkit/query'

import { CustomUseQueryStateResult } from 'lib/rtk-query/types'

import {
  GetSystemSettingsQueryArgs,
  GetSystemSettingsSuccessResponse,
} from 'shared/system/api/dto/systemSettings'
import { endpoints } from 'shared/system/api/endpoints/systemApi.endpoints'

type UseSystemSettingsStateResult = CustomUseQueryStateResult<
  GetSystemSettingsQueryArgs,
  GetSystemSettingsSuccessResponse
>

export const useSystemSettingsState = (
  args?: GetSystemSettingsQueryArgs | SkipToken,
): UseSystemSettingsStateResult => endpoints.getSystemSettings.useQueryState(args)
