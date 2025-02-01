import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getMacroregionsCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetMacroregionsCatalogQueryArgs,
  GetMacroregionsCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/macroregions'
import { useGetMacroregionsCatalogQuery } from 'shared/catalogs/api/endpoints/macroregionsCatalog.endpoints'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetMacroregionsCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetMacroregionsCatalogQueryArgs>,
  GetMacroregionsCatalogSuccessResponse
>

type UseGetMacroregionsCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetMacroregionsCatalogQueryArgs>,
  GetMacroregionsCatalogSuccessResponse
>

export const useGetMacroregionsCatalog = (
  args?: GetMacroregionsCatalogQueryArgs,
  options?: UseGetMacroregionsCatalogOptions,
): UseGetMacroregionsCatalogResult => {
  const state = useGetMacroregionsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMacroregionsCatalogErrMsg)
    }
  }, [state.error])

  return state
}
