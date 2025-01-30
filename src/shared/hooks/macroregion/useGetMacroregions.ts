import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getMacroregionsErrMsg } from 'shared/constants/macroregion'
import { GetMacroregionsQueryArgs, GetMacroregionsSuccessResponse } from 'shared/models/macroregion'
import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetMacroregionsQuery } from 'shared/services/macroregionApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetMacroregionsResult = CustomUseQueryHookResult<
  MaybeUndefined<GetMacroregionsQueryArgs>,
  GetMacroregionsSuccessResponse
>

type UseGetMacroregionsOptions = CustomUseQueryOptions<
  MaybeUndefined<GetMacroregionsQueryArgs>,
  GetMacroregionsSuccessResponse
>

export const useGetMacroregions = (
  args?: GetMacroregionsQueryArgs,
  options?: UseGetMacroregionsOptions,
): UseGetMacroregionsResult => {
  const state = useGetMacroregionsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMacroregionsErrMsg)
    }
  }, [state.error])

  return state
}
