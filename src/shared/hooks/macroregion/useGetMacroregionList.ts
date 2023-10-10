import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getMacroregionListMessages } from 'shared/constants/macroregion'
import {
  GetMacroregionListQueryArgs,
  GetMacroregionListSuccessResponse,
} from 'shared/models/macroregion'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetMacroregionListQuery } from 'shared/services/macroregionApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetMacroregionListResult = CustomUseQueryHookResult<
  GetMacroregionListQueryArgs,
  GetMacroregionListSuccessResponse
>

type UseGetMacroregionListOptions = CustomUseQueryOptions<
  GetMacroregionListQueryArgs,
  GetMacroregionListSuccessResponse
>

export const useGetMacroregionList = (
  args?: GetMacroregionListQueryArgs,
  options?: UseGetMacroregionListOptions,
): UseGetMacroregionListResult => {
  const state = useGetMacroregionListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMacroregionListMessages.commonError)
    }
  }, [state.error])

  return state
}
