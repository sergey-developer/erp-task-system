import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getMacroregionsErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetMacroregionsQueryArgs,
  GetMacroregionsSuccessResponse,
} from 'shared/catalogs/api/dto/macroregions'
import { useGetMacroregionsCatalogQuery } from 'shared/catalogs/api/endpoints/macroregionsCatalog.endpoints'
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
  const state = useGetMacroregionsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMacroregionsErrMsg)
    }
  }, [state.error])

  return state
}
